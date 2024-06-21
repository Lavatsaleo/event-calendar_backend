const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User');

// Initialize models and associations here
const db = {
  User,
  sequelize,
  Sequelize,
};

module.exports = db;
