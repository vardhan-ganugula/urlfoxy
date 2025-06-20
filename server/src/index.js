import express from 'express';
import {config} from 'dotenv';
import authRoute from '../routes/auth.route.js'; 
import userRoute from '../routes/user.route.js';
import {ENVIRONMENT} from '../utils/constants.js';
import {connectDB} from '../utils/DB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { authMiddleware } from '../middleware/auth.middleware.js';
import {authRateLimit} from '../utils/rateLimit.util.js';

config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}));

app.use('/api/auth',authRateLimit, authRoute);
app.use('/api/user',authMiddleware, userRoute);





if(ENVIRONMENT === 'development') {
    app.get('/', (req, res) => {
        res.json('working');
    })
}else{
    // TODO connect dist folder
}

const port = process.env.PORT || 8000;
const domain = process.env.DOMAIN || 'http://localhost';
app.listen(port, () => {
    console.log(`server is running at ${domain}:${port}`)
})