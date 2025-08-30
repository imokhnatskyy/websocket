const dotenv = require('dotenv');
dotenv.config();

module.exports.config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://mongo:IvzafCRgGujevZeleLUSyVHdkXLSVlad@mongodb.railway.internal:27017',
  redisUrl: process.env.REDIS_URL || 'redis://default:zofwGfbCkGPvujMXunWiJxNMIkgJlrNj@redis.railway.internal:6379',
  jwtSecret: process.env.JWT_SECRET || '70322cdb-d738-4fd8-8214-d',
};
