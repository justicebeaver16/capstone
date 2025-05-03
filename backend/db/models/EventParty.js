const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const EventParty = sequelize.define('EventParty', {
  // Parent table
}, {
  timestamps: true
});

module.exports = EventParty;