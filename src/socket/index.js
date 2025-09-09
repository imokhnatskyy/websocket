const { Server } = require('socket.io');
const crypto = require('crypto');

const { createAdapter } = require('@socket.io/redis-adapter');
const { socketAuth } = require('../middleware/socketAuth');
const { setupHeartbeat } = require('./heartbeat');

module.exports.createSocketServer = (server, pubClient, subClient) => {
  console.log('Creating Socket.IO server');

  const io = new Server(server, {
    transports: ['websocket'],
    timeout: 30000,
    pingInterval: 400000,
    pingTimeout: 400000,
    cors: { origin: '*' }
  });

  io.adapter(createAdapter(pubClient, subClient));
  setupHeartbeat(io, { intervalMs: 300000, timeoutMs: 9000 });
  io.use(socketAuth(pubClient));

  io.on('connection', socket => {
    console.log(`Connected: ${socket.id}`);

    socket.on('message', async data => {
      try {
        const { message, clientMsgId } = JSON.parse(data);

        const payload = {
          clientMsgId,
          serverMsgId: crypto.randomUUID(),
          message,
          sender: { userId: socket.user?.id || 'anonymous', username: socket.user?.username || 'Anonymous' },
          ts: Date.now()
        };

        socket.broadcast.emit('message', payload);

        if (typeof data === 'object' && typeof data.ack === 'function') {
          data.ack({ status: 'delivered', serverMsgId: payload.serverMsgId });
        }
      } catch (err) {
        console.error('Message handling error:', err.message);
        socket.emit('error', { message: err.message });
      }
    });

    socket.on('disconnect', () => {
      console.log(`Disconnected: ${socket.id}`);
    });
  });

  io.on('connect_error', err => {
    console.error('[Socket.IO] Connection error:', err.message);
  });

  return io;
};
