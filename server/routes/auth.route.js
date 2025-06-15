import { Router } from "express";
import {handleChangePassword, handleUserForgotPassword, handleUserLogin, handleUserLogout, handleUserSignUp} from "../controllers/auth.controller.js";

const app = Router(); 



app.post('/register', handleUserSignUp);
app.post('/login', handleUserLogin);
app.get('/logout', (handleUserLogout))
app.post('/forgot-password', handleUserForgotPassword)
app.post('/reset-password', handleChangePassword);
export default app;