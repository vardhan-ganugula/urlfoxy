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
  cookieOptions,
  FORGOT_PASSWORD_EXPIRY,
  REFRESH_TOKEN_EXPIRATION,
} from "../utils/constants.js";
import { sendForgortPasswordEmail } from "../utils/mail.util.js";
import emailQueue from "../queues/email.queue.js";
import { VERIFICATION_EXPIRY_TIME } from "../utils/constants.js";

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
      token,
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
    const user = await authModel.findOne({ email }).select("+password");
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

  try {
    sessionDetails = await sessionModel.create({
      userId: userDetails._id,
      userAgent: req.headers["user-agent"],
      ipAddress: req.ip,
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
  return res.status(200).json({
    message: "User logged in successfully",
    status: true,
    data: {
      id: userDetails._id,
      username: userDetails.username,
      email: userDetails.email,
      role: userDetails.role,
    },
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

  try {
    const user = await authModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }

  const forgotToken = generateToken();

  try {
    await authModel.updateOne(
      { email },
      {
        $set: {
          forgotPasswordToken: forgotToken,
          forgotPasswordExpiry:
            parseInt(Date.now()) + parseInt(FORGOT_PASSWORD_EXPIRY),
        },
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }

  await sendForgortPasswordEmail(email, forgotToken);

  return res.status(200).json({
    message: "Forgot password email sent successfully",
    status: true,
  });
};

export const handleChangePassword = async (req, res) => {
  const { email, password, token } = req.body;
  if (!email || !password || !token) {
    return res
      .status(400)
      .json({ error: "Email, password and token are required" });
  }

  try {
    const user = await authModel.findOne({
      email,
      forgotPasswordToken: token,
      forgotPasswordExpiry: {
        $gt: Date.now(),
      },
    });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid token or token expired", status: false });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
  const hashedPassword = await hashPassword(password);
  try {
    await authModel.updateOne(
      { email },
      {
        $set: {
          password: hashedPassword,
          forgotPasswordToken: null,
          forgotPasswordExpiry: null,
        },
      }
    );
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
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
    const result = await userModel.findOne({email});
    if(!result){
      return res.status(404).json({status: 'error', message: 'user not found'})
    }    
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    })
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
    if (result.modifiedCount === 0) {
      return res.status(400).json({
        status: "error",
        message: "An email is already sent. Wait 15 minutes for new one",
      });
    }
// add to email process queue
    await emailQueue.add(
      "sending confirmation email",
      {
        email,
        token,
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

// TODO: add a route to verify email