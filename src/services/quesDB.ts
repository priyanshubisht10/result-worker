import mng from 'mongoose';

if (!process.env.QUESTION_DATABASE || !process.env.QUESTION_DATABASE_PASSWORD) {
  throw new Error('Environment variables are missing!');
}

const DB = process.env.QUESTION_DATABASE.replace('<PASSWORD>', process.env.QUESTION_DATABASE_PASSWORD);

export const connectToQuesDB = async () => {
  try {
    if (mng.connection.readyState === 0) {
      await mng.connect(DB);
      console.log('Ques DB connection successful!');
    } else {
      console.log('Ques DB is already connected.');
    }
  } catch (err) {
    console.error('Ques DB connection error:', err);
    throw new Error('Failed to connect to the questions database');
  }
};

export default mng;
