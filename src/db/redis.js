const { createClient } = require('redis');
const { config } = require('../config/index.js');


module.exports.connectRedis = async () => {
  const client = createClient({ url: config.redisUrl });
  client.on('error', (err) => console.error('Redis Error:', err));
  await client.connect();
  console.log('Redis connected');
  return client;
}