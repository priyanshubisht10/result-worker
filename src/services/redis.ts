import { createClient } from 'redis';

const client = createClient({
   url: 'redis://127.0.0.1:6379'  
});

export default client;