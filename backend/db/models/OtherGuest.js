const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const OtherGuest = sequelize.define('OtherGuest', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = OtherGuest;