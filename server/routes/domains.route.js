import { Router } from "express";
import { handleDomainCheck } from "../controllers/domain.controller.js";
const app = Router();

app.get('/check-domain', handleDomainCheck); 


export const DomainRouter = app;