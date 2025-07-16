const redis = require('redis');

const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
  },
  retry_strategy: () => null
});

client.on('error', (err) => {
  console.log('Redis not available, using memory cache');
});

let isConnected = false;

client.connect().then(() => {
  isConnected = true;
  console.log('✅ Redis connected');
}).catch(() => {
  console.log('❌ Redis not available');
});

module.exports = { client, isConnected: () => isConnected };