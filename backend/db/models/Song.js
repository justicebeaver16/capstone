const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Song = sequelize.define('Song', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false
  },
  requestedByName: {
    type: DataTypes.STRING
  },
  requestType: {
    type: DataTypes.ENUM('slow-dance', 'dance-floor', 'general'),
    defaultValue: 'general'
  },
  approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : undefined,
  timestamps: true
});

module.exports = Song;