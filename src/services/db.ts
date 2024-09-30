import mongoose from 'mongoose';

if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD) {
  throw new Error('Environment variables are missing!');
}

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

export const connectToDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log('DB connection successful!');
  } catch (err) {
    console.error('DB connection error:', err);
    throw new Error('Failed to connect to the database');
  }
};

export default mongoose;

