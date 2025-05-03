const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const GuestAttendee = sequelize.define('GuestAttendee', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mealChoice: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false
});

module.exports = GuestAttendee;