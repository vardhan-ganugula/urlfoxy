import { decode } from "jsonwebtoken";
import authModel from "../models/auth.model.js";
import sessionModel from "../models/session.model.js";
import { decodeJWTtoken, generateAccessToken } from "../utils/auth.utils.js";
import { ACCESS_TOKEN_EXPIRATION, cookieOptions, REFRESH_TOKEN_EXPIRATION } from "../utils/constants.js";

export const authMiddleware = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;
  if (!accessToken && !refreshToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (accessToken && accessToken !== "undefined") {
    const decoded = decodeJWTtoken(accessToken);
    try {
      const session = await sessionModel.findOne({ _id: decoded.sessionId });
      if (!session) {
        return res.status(401).json({ error: "Unauthorized", status: "false" });
      }
    } catch (error) {
      console.log("error", error);
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const user = await authModel.findOne({ _id: decoded.id });
      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      req.user = user;
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  }


  if (!accessToken && refreshToken) {
    console.log("refreshToken", refreshToken);
    const decoded = decodeJWTtoken(refreshToken);
    try {
      const session = await sessionModel.findOne({ _id: decoded.sessionId });
      if (!session) {
        return res.status(401).json({ error: "Unauthorized", status: "false" });
      }
    } catch (error) {
      console.log("error", error);
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const user = await authModel.findOne({ _id: decoded.id });
      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      req.user = user;
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const newSession = await sessionModel.create({
        userId: decoded.id,
        valid: true,
        userAgent: req.headers["user-agent"],
        ipAddress: req.ip,
      });
      console.log("newSession", newSession);

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
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  }
  next();
};
