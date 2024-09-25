import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import db from './services/db';
import client from './services/redis';

async function init() {
   while(true) {
      // const submission = await isPython();  
      // await new Promise(resolve => setTimeout(resolve, 5000)); 
      // if (submission) {
      //     console.log(submission);
      // } 
   }
}

init();



