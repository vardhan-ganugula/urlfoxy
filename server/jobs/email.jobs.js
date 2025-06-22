import { Worker } from "bullmq";
import { connection } from "../config/redis.config.js";
import { sendConfirmationEmail, sendForgortPasswordEmail } from "../utils/mail.util.js";
import { COMPANY_NAME } from "../utils/constants.js";

export function runEmailWorker() {
  new Worker(
    "email-queue",
    async (job) => {
      console.log(`Currently executing ${job.id}`);
      const { email, token, username, type } = job.data;
      switch (type) {
        case 1: {
          await sendForgortPasswordEmail(email, token);
          break;
        }
        case 0: {
          console.log('sending')
          await sendConfirmationEmail(username, email, token);
          break;
        }
      }
    },
    { connection }
  );
}
