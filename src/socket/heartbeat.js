/* eslint-disable no-param-reassign, no-restricted-syntax */
module.exports.setupHeartbeat = (io, { intervalMs = 3000000 } = {}) => {
  io.use((socket, next) => {
    socket.data = socket.data || {};
    socket.data.isAlive = true;
    socket.on('client:pong', () => { socket.data.isAlive = true; });
    next();
  });

  const interval = setInterval(() => {
    for (const [id, socket] of io.of('/').sockets) {
      if (!socket.data.isAlive) {
        console.log(`Disconnecting socket: ${id}`);
        socket.disconnect(true);
      } else {
        socket.data.isAlive = false;
        socket.emit('server:ping');
      }
    }
  }, intervalMs);

  io.engine.on('close', () => clearInterval(interval));
};
