const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Seat = sequelize.define('Seat', {
  seatNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  guestName: {
    type: DataTypes.STRING
  },
  assigned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : undefined,
  timestamps: true
});

module.exports = Seat;