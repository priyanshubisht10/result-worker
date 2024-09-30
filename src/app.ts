import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import { connectToDB } from './services/db'; // Import async DB connection
import { connectToRedis } from './services/redis'; // Import async Redis connection   
import client from './services/redis';
import AppError from './utils/appError';
import Submission from './interfaces/submission';
import verifySolution from './utils/verifySolution';

async function init() {

   await connectToDB();
   await connectToRedis();

   while (true) {
      try {
   
         const data = await client.brPop('submissions', 10800000);
         if (!data) {
            throw new AppError('Could not fetch the data from the queue!', 400);
         }

         const submission: Submission = JSON.parse(data.element);

         const result = verifySolution(submission);
         console.log(result);

      } catch (error) {
         console.error('Error processing submission:', error);

         if (error instanceof AppError) {
         } else {
            process.exit(1); 
         }
      }
   }
}

init();
