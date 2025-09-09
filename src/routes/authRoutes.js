const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { config } = require('../config');
const {
  hashPassword,
  comparePassword,
  users
} = require('../services/userService');

const createAuthRoutes = pubClient => {
  const router = express.Router();

  router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (users.has(username)) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const id = crypto.randomUUID();
    const passwordHash = await hashPassword(password);
    users.set(username, { id, username, passwordHash });

    res.json({ id, username });
    return res.status(201).json({ id, username });
  });

  router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.get(username);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await comparePassword(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { sub: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: '1h' }
    );

    await pubClient.hSet('sessions', user.id, JSON.stringify({ username: user.username }));

    res.json({ token });
    return res.status(200).json({ token });
  });

  return router;
};

module.exports = { createAuthRoutes };
