import express from "express";
import { config } from "dotenv";
import authRoute from "../routes/auth.route.js";
import userRoute from "../routes/user.route.js";
import { ENVIRONMENT } from "../utils/constants.js";
import { connectDB } from "../utils/DB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authRateLimit } from "../utils/rateLimit.util.js";
import { runEmailWorker } from "../jobs/email.jobs.js";
import { DomainRouter } from "../routes/domains.route.js";
import path from "path";
import { fileURLToPath } from "url";

config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
runEmailWorker();
app.use("/api/auth", authRateLimit, authRoute);
app.use("/api/user", authMiddleware, userRoute);
app.use("/api/domains",DomainRouter)
if (ENVIRONMENT === "development") {
  app.get("/", (req, res) => {
    res.json("working");
  });
} else {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  app.use(express.static(path.join(__dirname, "../../client/dist")));
  app.get("*url", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
  });
}

const port = process.env.PORT || 8000;
const domain = process.env.DOMAIN || "http://localhost";
app.listen(port, () => {
  console.log(`server is running at ${domain}:${port}`);
});
