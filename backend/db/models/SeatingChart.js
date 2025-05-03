const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SeatingChart = sequelize.define('SeatingChart', {
  name: {
    type: DataTypes.STRING,
    defaultValue: 'Main Seating Chart'
  },
  venueWidth: {
    type: DataTypes.INTEGER,
    defaultValue: 1000
  },
  venueHeight: {
    type: DataTypes.INTEGER,
    defaultValue: 800
  },
  tableSizeRound: {
    type: DataTypes.INTEGER,
    defaultValue: 100
  },
  tableSizeRectWidth: {
    type: DataTypes.INTEGER,
    defaultValue: 150
  },
  tableSizeRectHeight: {
    type: DataTypes.INTEGER,
    defaultValue: 80
  }
}, {
  timestamps: true
});

module.exports = SeatingChart;