const mongoose = require('mongoose');

module.exports.connectMongoDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://mongo:IvzafCRgGujevZeleLUSyVHdkXLSVlad@mongodb.railway.internal:27017';
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('[mongoDB] Connected to MongoDB');
};
