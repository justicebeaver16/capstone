const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MoodBoard = sequelize.define('MoodBoard', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true
});

module.exports = MoodBoard;