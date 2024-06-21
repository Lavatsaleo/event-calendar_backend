const jwt = require('jsonwebtoken');
const { User } = require('../models');
const secret = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, secret, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.userId = decoded.userId;
    const user = await User.findByPk(req.userId);
    req.userRole = user.role;
    next();
  });
};

module.exports = authMiddleware;
