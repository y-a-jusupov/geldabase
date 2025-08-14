const { createClient } = require('redis');

// Подключение к Upstash Redis REST API
const client = createClient({
  url: process.env.REDIS_URL
});

const connectRedis = async () => {
  client.on("error", function(err) {
    console.error('❌ Redis connection failed:', error);
    throw err;
  });

  await client.connect();
  console.log('✅ Redis connected');
};

module.exports = { connectRedis };
