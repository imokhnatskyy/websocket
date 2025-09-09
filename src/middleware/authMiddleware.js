const { verifyToken } = require('../services/userService');

module.exports.authMiddleware = (req, res, next) => {
  console.log('Auth middleware triggered');
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  const payload = verifyToken(token);
  if (!payload) return res.status(401).json({ error: 'Invalid token' });

  req.user = payload;
  next();
  return res.status(200).json({ message: 'Authenticated', user: payload });
};
