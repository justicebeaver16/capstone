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
  timestamps: true
});

module.exports = Seat;