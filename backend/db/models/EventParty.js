const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const EventParty = sequelize.define('EventParty', {
  // Define columns/attributes here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Add other attributes as needed
}, {
  schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : undefined,
  timestamps: true
});

module.exports = EventParty;