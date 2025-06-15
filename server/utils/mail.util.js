import nodemailer from "nodemailer";
import { getMailConfig } from "./constants.js";
import {CLIENT_URL} from "./constants.js";
const mailConfig = getMailConfig();
const transporter = nodemailer.createTransport(mailConfig);

// TODO : create a mail template for the email 


export const sendForgortPasswordEmail = async (email, token) => {

   await transporter.sendMail({
        from : mailConfig.auth.user,
        to : email, 
        subject : "Reset Password Request",
        html : `
        <h1>Reset Password</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${CLIENT_URL}/reset-password/${token}">Reset Password</a>

        ${CLIENT_URL}/reset-password/${token}

        
        <p>If you did not request this, please ignore this email.</p>
        <p>Thank you!</p>

        `
    })
}