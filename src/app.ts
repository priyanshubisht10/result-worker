import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import { connectToDB } from './services/db'; // Import async DB connection
// import { connectToQuesDB } from './services/quesDB'; // Import async DB connection
import { connectToRedis } from './services/redis'; // Import async Redis connection   
import client from './services/redis';
import AppError from './utils/appError';
import Submission from './interfaces/submission';
import verifySolution from './utils/verifySolution';
// import isCorrect from './utils/isCorrect';

async function init() {

   await connectToDB();
   // await connectToQuesDB();
   await connectToRedis();

   while (true) {
      try {
   
         const data = await client.brPop('submissions', 10800000);
         if (!data) {
            throw new AppError('Could not fetch the data from the queue!', 400);
         }

         const submission: Submission = JSON.parse(data.element);

         const result = await verifySolution(submission);
         console.log(result);

         let pub;
         if(result) {
            pub = await client.publish("positive-processed", JSON.stringify( submission ));
         } else {
            pub = await client.publish("negative-processed", JSON.stringify( submission ));
         }
         
         // isCorrect(submission);
         
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
