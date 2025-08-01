import { decode } from "jsonwebtoken";
import authModel from "../models/user.model.js";
import sessionModel from "../models/session.model.js";
import { decodeJWTtoken, generateAccessToken } from "../utils/auth.utils.js";
import { ACCESS_TOKEN_EXPIRATION, cookieOptions, REFRESH_TOKEN_EXPIRATION } from "../utils/constants.js";
import DeviceDetector from "node-device-detector";

export const authMiddleware = async (req, res, next) => {

  const { accessToken, refreshToken } = req.cookies;
  if (!accessToken && !refreshToken) {
    return res.status(401).json({ status: 'error', message: "Unauthorized" });
  }
  else if (accessToken && accessToken !== "undefined") {
    const decoded = decodeJWTtoken(accessToken);
    try {
      const session = await sessionModel.findOne({ _id: decoded.sessionId, valid: true });
      if (!session) {
        return res.status(401).json({ message: "Unauthorized", status: "error" });
      }
    } catch (error) {
      console.log("error", error);
      return res.status(401).json({ status: 'error', message: "Unauthorized" });
    }

    try {
      const user = await authModel.findOne({ _id: decoded.id });
      if (!user) {
        return res.status(401).json({ status :"error", message: "Unauthorized" });
      }
      req.user = user;
    } catch (error) {
      return res.status(401).json({ status: 'error', message: "Unauthorized" });
    }
  }


  else if (!accessToken && refreshToken) {
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
      const decoded = decodeJWTtoken(refreshToken);
      const session = await sessionModel.findOne({ _id: decoded.sessionId, valid: true });
      if (!session) {
        return res.status(401).json({ message: "Unauthorized", status: "error" });
      }
    } catch (error) {
      console.log("error", error);
      return res.status(401).json({ status: 'error', message: "Unauthorized" });
    }
    try {
      const user = await authModel.findOne({ _id: decoded.id });
      if (!user) {
        return res.status(401).json({ status: 'error', message: "Unauthorized" });
      }
      req.user = user;
    } catch (error) {
      return res.status(401).json({ status: 'error', message: "Unauthorized" });
    }

    try {
      const newSession = await sessionModel.create({
        userId: decoded.id,
        valid: true,
        userAgent: req.headers["user-agent"],
        ipAddress: req.ip,
        device
      });
        const newAccessToken = generateAccessToken({
            id: decoded.id,
            sessionId: newSession._id,
            username: decoded.username,
            role: decoded.role,
        });
        const newRefreshToken = generateAccessToken({
            id: decoded.id,
            sessionId: newSession._id,
        });

        const accessCookieOption = cookieOptions(ACCESS_TOKEN_EXPIRATION);
        const refreshCookieOption = cookieOptions(REFRESH_TOKEN_EXPIRATION);
        res.cookie("accessToken", newAccessToken, accessCookieOption);
        res.cookie("refreshToken", newRefreshToken, refreshCookieOption);

    } catch (error) {
      console.log(error)
      return res.status(401).json({ status: 'error' , message: "Unauthorized" });
    }
  }
  next();
};
