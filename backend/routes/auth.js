const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, pin } = req.body;

  if (
    username === process.env.ADMIN_USER &&
    pin === process.env.ADMIN_PIN
  ) {
    const token = jwt.sign(
      { role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    return res.json({ token });
  }

  res.status(401).json({ error: 'Invalid login' });
});

module.exports = router;
