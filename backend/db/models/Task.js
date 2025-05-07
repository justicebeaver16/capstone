const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  dueDate: {
    type: DataTypes.DATE
  },
  status: {
    type: DataTypes.ENUM('not-started', 'in-progress', 'completed'),
    defaultValue: 'not-started'
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : undefined,
  timestamps: true
});

module.exports = Task;