import { config } from "dotenv";


config();

export const ENVIRONMENT = process.env.ENVIRONMENT || 'development'; 
export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
export const FORGOT_PASSWORD_EXPIRY = process.env.FORGOT_PASSWORD_EXPIRY; 
export const VERIFICATION_EXPIRY_TIME = process.env.VERIFICATION_EXPIRY_TIME || 15*60*1000;
export const COMPANY_NAME = process.env.COMPANY_NAME || 'urlfox.com'
export const JWT_SECRET = process.env.JWT_SECRET;
export const SESSION_TOKEN_EXPIRATION = process.env.SESSION_TOKEN_EXPIRATION || 24*60 * 60 * 1000; // 15 minutes
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export const DOMAIN = process.env.DOMAIN || "localhost:3000";
if(!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env file");
}



export const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION || 15 * 60 * 1000;
export const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION || 7 * 24 * 60 * 60 * 1000; 
export const cookieOptions = (age) => {
    return {
        httpOnly: true,
        secure: ENVIRONMENT === "production",
        sameSite: "strict",
        maxAge: age,
    };
} 

