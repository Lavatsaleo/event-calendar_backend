const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Ensure this import is correct

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Log incoming login request details for debugging
    console.log('Login attempt:', { username });

    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.log('User not found:', username);
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch for user:', username);
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Login successful for user:', username);
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error); // Detailed logging for debugging
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
