const jwt = require('jsonwebtoken');
const { User } = require('../models');
const secret = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Verifying token:', token); // Log the token to verify

  jwt.verify(token, secret, async (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        console.error('Token expired:', err); // Log the error for expired token
        return res.status(401).json({ error: 'Token expired' });
      }
      console.error('Token verification failed:', err); // Log the error for other token verification issues
      return res.status(401).json({ error: 'Invalid token' });
    }

    console.log('Decoded token:', decoded); // Log the decoded token
    req.userId = decoded.userId;
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      req.userRole = user.role;
      next();
    } catch (userError) {
      console.error('Error fetching user:', userError);
      return res.status(500).json({ error: 'Failed to fetch user information' });
    }
  });
};

module.exports = authMiddleware;
