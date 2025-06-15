import bcrypt from "bcrypt"; 
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./constants.js";

export const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
} 

export const comparePassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
} 

export const generateToken = () => {
    const sessionId = crypto.randomBytes(16).toString("hex");
    return sessionId;
}

export const generateAccessToken = (user) => {
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
    return token;
} 

export const generateRefreshToken = (user) => {
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
    return token;
}

export const decodeJWTtoken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error("Invalid token");
        return null;
    }
};