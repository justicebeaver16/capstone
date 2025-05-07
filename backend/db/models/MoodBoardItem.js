const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MoodBoardItem = sequelize.define('MoodBoardItem', {
  type: {
    type: DataTypes.ENUM('image', 'note', 'link'),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  source: {
    type: DataTypes.STRING
  },
  tags: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  positionX: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  positionY: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  width: {
    type: DataTypes.INTEGER,
    defaultValue: 200
  },
  height: {
    type: DataTypes.INTEGER,
    defaultValue: 200
  }
}, {
  schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : undefined,
  timestamps: true
});

module.exports = MoodBoardItem;