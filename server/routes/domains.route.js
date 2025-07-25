import { Router } from "express";
import { handleDomainCheck, handleDomainAdd, handleDomainVefify,handleDeleteDomain } from "../controllers/domain.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const app = Router();

app.get('/check-domain', handleDomainCheck); 
app.post('/add-domain', authMiddleware, handleDomainAdd)
app.get('/verify-domain', authMiddleware, handleDomainVefify)
app.delete('/delete-domain', authMiddleware, handleDeleteDomain); 
// TODO: add get all domains route
// TODO: add issue ssl certificate route



export const DomainRouter = app;