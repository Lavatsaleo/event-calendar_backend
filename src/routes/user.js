const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Add a new user (admin only)
router.post('/add', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, role });
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(400).json({ error: 'Error creating user' });
  }
});

// Fetch all users (admin only)
router.get('/', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

module.exports = router;
