import authModel from "../models/auth.model.js";
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

export const handleUserSignUp = async (req, res) => {
  const data = req.body;
  const response = registerSchema.safeParse(data);
  if (!response.success) {
    return res.status(404).json({ error: response.error.errors[0].message });
  }
  const { username, email, password } = response.data;

  try {
    const existingUser = await authModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
  const hashedPassword = await hashPassword(password);
  const newUser = await authModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const sessionId = await sessionModel.create({
    userId: newUser._id,
    userAgent: req.headers["user-agent"],
    ipAddress: req.ip,
  });

  const accessToken = generateAccessToken({
    id: newUser._id,
    sessionId: sessionId._id,
    username: newUser.username,
    role: newUser.role,
  });

  const refreshToken = generateRefreshToken({
    id: newUser._id,
    sessionId: sessionId._id,
  });
  const accessCookieOption = cookieOptions(ACCESS_TOKEN_EXPIRATION);
  const refreshCookieOption = cookieOptions(REFRESH_TOKEN_EXPIRATION);
  res.cookie("accessToken", accessToken, accessCookieOption);
  res.cookie("refreshToken", refreshToken, refreshCookieOption);

  return res.status(201).json({
    message: "User registered successfully",
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
  if(!email || !password || !token) {
    return res.status(400).json({ error: "Email, password and token are required" });
  }

  try {
    const user = await authModel.findOne({email, forgotPasswordToken:token, forgotPasswordExpiry : {
      $gt: Date.now()
    }})
    if(!user) {
      return res.status(400).json({ error: "Invalid token or token expired", status: false });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
    
  }
  const hashedPassword = await hashPassword(password);
  try {
    await authModel.updateOne({email}, {
      $set: {
        password: hashedPassword,
        forgotPasswordToken: null,
        forgotPasswordExpiry: null
      }
    })
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
    
  }

  return res.status(200).json({ message: "Password changed successfully", status: true });
}

// $2b$10$FKIw3r5pQKykelNYgIx9YON1eTSODeR4/Nmc1B7rndsKo/c3w30Ku