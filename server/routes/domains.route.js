import { Router } from "express";
import { handleDomainCheck, handleDomainAdd, handleDomainVefify,handleDeleteDomain,handleGETDomains,handleIssueSSLCertificate } from "../controllers/domain.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const app = Router();

app.get('/check-domain', handleDomainCheck); 
app.post('/add-domain', authMiddleware, handleDomainAdd)
app.get('/verify-domain', authMiddleware, handleDomainVefify)
app.delete('/delete-domain', authMiddleware, handleDeleteDomain); 
app.get('/', authMiddleware, handleGETDomains)
app.post('/issue-ssl-certificate', authMiddleware, handleIssueSSLCertificate);



export const DomainRouter = app;