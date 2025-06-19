import { Queue } from 'bullmq';
import { connection } from '../config/redis.config.js';

const emailQueue = new Queue('email-queue', {connection});


export default emailQueue;