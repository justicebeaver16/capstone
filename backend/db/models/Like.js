const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Like = sequelize.define('Like', {
  // Associations only
}, {
  timestamps: true
});

module.exports = Like;