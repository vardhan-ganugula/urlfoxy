import {Worker} from 'bullmq';
import { connection } from '../config/redis.config.js';
import {sendConfirmationEmail} from '../utils/mail.util.js'
import { config } from 'dotenv';

config();
new Worker('email-queue', async(job) => {
    console.log(`Currently executing ${job.id}`);
    const {email, token} = job.data;
    await sendConfirmationEmail(email, token)

}, {connection});