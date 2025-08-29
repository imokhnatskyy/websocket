const express = require('express');
const http = require('http');
const cors = require('cors');
const healthRoutes = require('./routes/healthRoutes.js');
const { createAuthRoutes } = require('./routes/authRoutes.js');
const { connectMongoDB } = require('./db/mongoose.js');
const { connectRedis } = require('./db/redis.js');
const { createSocketServer } = require('./socket/index.js');
const { config } = require('./config/index.js');

async function startServer() {
  try {
    await connectMongoDB();
    const pubClient = await connectRedis();
    const subClient = pubClient.duplicate();
    await subClient.connect();

    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use('/api', createAuthRoutes(pubClient));
    
    app.use('/', healthRoutes);

    const server = http.createServer(app);

    createSocketServer(server, pubClient, subClient);

    server.listen(config.port, () =>
      console.log(`Server running on port ${config.port}`)
    );
  } catch (err) {
    console.error('Server initialization failed:', err);
    process.exit(1);
  }
}

startServer();
