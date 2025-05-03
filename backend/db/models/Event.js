const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Event = sequelize.define('Event', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING
  },
  city: {
    type: DataTypes.STRING
  },
  state: {
    type: DataTypes.STRING
  },
  zipCode: {
    type: DataTypes.STRING
  },
  latitude: {
    type: DataTypes.FLOAT
  },
  longitude: {
    type: DataTypes.FLOAT
  },
  description: {
    type: DataTypes.TEXT
  },
  eventType: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM('planning', 'upcoming', 'completed', 'cancelled'),
    defaultValue: 'planning'
  }
}, {
  timestamps: true
});

module.exports = Event;