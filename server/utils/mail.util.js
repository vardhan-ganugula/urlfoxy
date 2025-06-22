import nodemailer from "nodemailer";
import { getMailConfig } from "../config/mail.config.js";
import { forgotPasswordEmailTemplate, userVerificationEmailTemplate } from "./emailTemplates.js";
const mailConfig = getMailConfig();
const transporter = nodemailer.createTransport(mailConfig);

// TODO : create a mail template for the email

export const sendForgortPasswordEmail = async (email, token) => {
  try {
    await transporter.sendMail({
      from: mailConfig.auth.user,
      to: email,
      subject: "Reset Password Request",
      html: forgotPasswordEmailTemplate(token),
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendConfirmationEmail = async (username, email, token) => {
  try {
    const result = await transporter.sendMail({
      from: mailConfig.auth.user,
      to: email,
      subject: "Click here to verify your Account",
      html: userVerificationEmailTemplate(username, token),
    });
    console.log(`A verification email sent to ${email}`);
  } catch (error) {
    console.log(error);
  }
};

// TODO : create email templates and also update the process queues
