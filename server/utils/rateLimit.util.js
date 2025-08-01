import {rateLimit } from 'express-rate-limit';


export const authRateLimit = rateLimit({
    windowMs : 1*60*1000,
    limit: 15,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
})