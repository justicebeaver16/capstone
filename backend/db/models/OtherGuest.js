const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const OtherGuest = sequelize.define('OtherGuest', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : undefined,
  timestamps: false
});

module.exports = OtherGuest;