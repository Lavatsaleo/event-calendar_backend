require('dotenv').config();
const bcrypt = require('bcrypt');
const { User } = require('../models');
const sequelize = require('../config/database');

async function createAdminUser() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    const username = 'Test';
    const password = 'Gianna@2023';  // Replace with a secure password
    const role = 'admin';

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      role,
    });

    console.log('Admin user created:', user);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await sequelize.close();
  }
}

createAdminUser();
