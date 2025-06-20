import { Router } from "express";
import {handleChangePassword, handleUserForgotPassword, handleUserLogin, handleUserLogout, handleUserSignUp, sendVerificationEmail} from "../controllers/auth.controller.js";

const app = Router(); 



app.post('/register', handleUserSignUp);
app.post('/login', handleUserLogin);
app.get('/logout', (handleUserLogout))
app.post('/forgot-password', handleUserForgotPassword)
app.post('/reset-password', handleChangePassword);
app.post('/send-verification-email', sendVerificationEmail)
export default app;