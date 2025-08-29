const mongoose = require('mongoose');
const { config } = require('../config/index.js');

module.exports.connectMongoDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/chat_service';
  mongoose.set('strictQuery', false);
  await mongoose.connect(uri);
  console.log('[mongoDB] Connected to MongoDB');
}
