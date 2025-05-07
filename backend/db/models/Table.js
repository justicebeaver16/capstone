const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Table = sequelize.define('Table', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  capacity: {
    type: DataTypes.INTEGER,
    defaultValue: 8
  },
  tableType: {
    type: DataTypes.ENUM('round', 'rectangular', 'custom'),
    defaultValue: 'round'
  },
  positionX: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  positionY: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : undefined,
  timestamps: true
});

module.exports = Table;