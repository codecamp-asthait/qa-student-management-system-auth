const jwt = require('jsonwebtoken');

const USERNAME = process.env.AUTH_USERNAME || 'admin';
const PASSWORD = process.env.AUTH_PASSWORD || 'password123';

exports.login = (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  if (username !== USERNAME || password !== PASSWORD) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const secret = process.env.JWT_SECRET || 'secretkey';
  const token = jwt.sign({ username }, secret, { expiresIn: '1d' });

  res.json({ authToken: token });
};
