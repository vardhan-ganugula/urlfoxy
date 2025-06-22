import userModel from "../models/user.model.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import {
  comparePassword,
  decodeJWTtoken,
  generateAccessToken,
  generateRefreshToken,
  generateToken,
  hashPassword,
} from "../utils/auth.utils.js";
import sessionModel from "../models/session.model.js";
import {
  ACCESS_TOKEN_EXPIRATION,
  CLIENT_URL,
  cookieOptions,
  FORGOT_PASSWORD_EXPIRY,
  REFRESH_TOKEN_EXPIRATION,
} from "../utils/constants.js";
import { sendForgortPasswordEmail } from "../utils/mail.util.js";
import emailQueue from "../queues/email.queue.js";
import { VERIFICATION_EXPIRY_TIME } from "../utils/constants.js";
import DeviceDetector from "node-device-detector";
import forgotPasswordModel from "../models/forgotPassword.model.js";
import { forgotPasswordEmailTemplate } from "../utils/emailTemplates.js";

export const handleUserSignUp = async (req, res) => {
  const data = req.body;
  const response = registerSchema.safeParse(data);
  if (!response.success) {
    return res.status(404).json({ error: response.error.errors[0].message });
  }
  const { username, email, password } = response.data;
  // check for existing user
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
  // generate hashpassword
  const hashedPassword = await hashPassword(password);
  const token = generateToken();
  let newUser;
  try {
    newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
      emailVerificationToken: token,
      emailVerificationExpiry: Date.now() + VERIFICATION_EXPIRY_TIME,
    });
  } catch (error) {
    return res.status(409).json({
      status: "error",
      message: error?.message,
    });
  }
  // add to email process queue

  await emailQueue.add(
    "send-vefification-email",
    {
      email,
      username: newUser["username"],
      token,
      type: 0,
    },
    {
      removeOnComplete: true,
      removeOnFail: {
        count: 5,
      },
    }
  );

  return res.status(201).json({
    message: "User registered successfully check you email",
    status: true,
    data: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    },
  });
};

export const handleUserLogin = async (req, res) => {
  const userData = req.body;
  const response = loginSchema.safeParse(userData);
  if (!response.success) {
    return res.status(404).json({ error: response.error.errors[0].message });
  }
  let sessionDetails;
  let userDetails;
  const { email, password } = response.data;
  try {
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    userDetails = user;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }

  const isPasswordValid = await comparePassword(password, userDetails.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid password" });
  }
  const userAgent = req.headers["user-agent"];
  const detector = new DeviceDetector({
    clientIndexes: true,
    deviceIndexes: true,
    osIndexes: true,
    deviceAliasCode: false,
    deviceTrusted: false,
    deviceInfo: false,
    maxUserAgentSize: 500,
  });
  const device = detector?.os?.name || "Unknown";
  try {
    sessionDetails = await sessionModel.create({
      userId: userDetails._id,
      userAgent,
      ipAddress: req.ip,
      device,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: "error while creating session",
    });
  }
  const accessToken = generateAccessToken({
    id: userDetails._id,
    sessionId: sessionDetails._id,
    username: userDetails.username,
    role: userDetails.role,
  });

  const refreshToken = generateRefreshToken({
    id: userDetails._id,
    sessionId: sessionDetails._id,
  });

  const accessCookieOption = cookieOptions(ACCESS_TOKEN_EXPIRATION);
  const refreshCookieOption = cookieOptions(REFRESH_TOKEN_EXPIRATION);
  res.cookie("accessToken", accessToken, accessCookieOption);
  res.cookie("refreshToken", refreshToken, refreshCookieOption);
  const { password: noNeed, ...userWithoutPassword } = userDetails.toObject();
  return res.status(200).json({
    message: "User logged in successfully",
    status: true,
    data: userWithoutPassword,
  });
};

export const handleUserLogout = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  console.log("refreshToken", refreshToken);
  const decoded = decodeJWTtoken(refreshToken);
  try {
    const result = await sessionModel.deleteOne({ _id: decoded.sessionId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res
      .status(200)
      .json({ message: "User logged out successfully", status: true });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const handleUserForgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  let user;
  try {
    user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }

  const forgotToken = generateToken();

  try {
    const result = await forgotPasswordModel.findOne({email});
    if(result){
      return res.status(200).json({
        status: 'error',
        message: 'An email is already sent. Wait 15minutes for new one'
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error?.message
    })
  }


  try {
    await forgotPasswordModel.create({
      email,
      userId: user._id,
      forgotPasswordToken: forgotToken,
      forgotPasswordExpiry:
        parseInt(Date.now()) + parseInt(FORGOT_PASSWORD_EXPIRY),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }


  await emailQueue.add(
    "send-reset-email",
    {
      email,
      username: user["username"],
      token : forgotToken,
      type: 1,
    },
    {
      removeOnComplete: true,
      removeOnFail: {
        count: 5,
      },
    }
  );

  return res.status(200).json({
    message: "Forgot password email sent successfully",
    status: true,
  });
};

export const handleChangePassword = async (req, res) => {
  const { email, password, token } = req.body;
  if (!email || !password || !token) {
    return res
      .status(404)
      .json({ error: "Email, password and token are required" });
  }
  // check for forgot password session
  try {
    const forgotSession = await forgotPasswordModel.findOne({
      email,
      forgotPasswordToken: token,
      forgotPasswordExpiry: {
        $gt: Date.now(),
      },
    });
    if (!forgotSession) {
      return res
        .status(400)
        .json({ error: "Invalid token or token expired", status: false });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
  // create hashedPassword
  const hashedPassword = await hashPassword(password);
  // update password
  try {
    await userModel.updateOne(
      { email },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }

  // delete forgot session


  try {
    await forgotPasswordModel.deleteOne({email});
  } catch (error) {
    console.log(error)
  }

  return res
    .status(200)
    .json({ message: "Password changed successfully", status: true });
};

export const sendVerificationEmail = async (req, res) => {
  const email = req.body?.email;
  if (!email) {
    return res.status(400).json({
      status: "error",
      message: "email is required",
    });
  }
  const token = generateToken();

  try {
    const result = await userModel.findOne({ email });
    if (!result) {
      return res
        .status(404)
        .json({ status: "error", message: "user not found" });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }

  try {
    const result = await userModel.updateOne(
      {
        email,
        emailVerificationExpiry: {
          $lt: Date.now(),
        },
      },
      {
        emailVerificationToken: token,
        emailVerificationExpiry: Date.now() + VERIFICATION_EXPIRY_TIME,
      }
    );
    // if modified is zero which means the verificationExpiry is stil exists
    console.log(result)
    if (result.modifiedCount === 0) {
      return res.status(400).json({
        status: "error",
        message: "An email is already sent. Wait 15 minutes for new one",
      });
    }
    // add to email process queue
    await emailQueue.add(
    "send-vefification-email",
    {
      email,
      username: email,
      token,
      type: 0,
    },
    {
      removeOnComplete: true,
      removeOnFail: {
        count: 5,
      },
    }
  );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: error?.message || "internal server error",
    });
  }

  return res.status(202).json({
    status: "success",
    message: "Verification email sent successfully",
  });
};

export const handleVerifyUser = async (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.status(404).json({
      status: "error",
      message: "Verification Token not found",
    });
  }

  try {
    const result = await userModel.findOneAndUpdate(
      {
        emailVerificationToken: token,
        isEmailVerified: false,
        emailVerificationExpiry: {
          $gt: Date.now(),
        },
      },
      {
        isEmailVerified: true,
      },
      { new: true }
    );

    if (!result) {
      return res.status(400).json({
        status: "success",
        message: "Expired Token or Already Verified",
      });
    }

    return res
      .json({
        status: "success",
        message: "User Verified Successfully",
        user: result,
      })
      .status(200);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error?.message,
    });
  }
};
