const { verifyToken } = require('../services/userService.js');

module.exports.socketAuth = (pubClient) => {
  return async (socket, next) => {
    const token = socket.handshake.auth?.token || socket.handshake.headers?.auth;
    if (!token) {
      console.warn('[socketAuth] No token');
      return next(new Error('No auth token'));
    }

    try {
      const payload = verifyToken(token);

      const session = await pubClient.hGet('sessions', payload.sub);

      if (!session) {
        console.warn('[socketAuth] Session not found in Redis for sub:', payload.sub);
        return next(new Error('Session not found'));
      }

      socket.user = { id: payload.sub, username: payload.username };
      return next();
    } catch (err) {
      console.error('[socketAuth] Error:', err.message);
      return next(new Error('Auth error'));
    }
  };
};
