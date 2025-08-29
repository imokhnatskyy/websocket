const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { config } = require('../config/index.js');

module.exports.users = new Map();

module.exports.signToken = (user) => {
  return jwt.sign({ sub: user.id, username: user.username }, config.jwtSecret, { expiresIn: '1h' });
}

module.exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch {
    return null;
  }
}

module.exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

module.exports.comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
}
