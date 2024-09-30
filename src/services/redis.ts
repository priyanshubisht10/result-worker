import { createClient} from 'redis';

const client = createClient({
   url: process.env.REDIS_URL || 'redis://127.0.0.1:6379'
});

export const connectToRedis = async () => {
  try {
    await client.connect();
    console.log('Connected to Redis successfully');
  } catch (err) {
    console.error('Redis connection error:', err);
    throw new Error('Failed to connect to Redis');
  }
};

export default client;
