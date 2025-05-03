const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Playlist = sequelize.define('Playlist', {
  name: {
    type: DataTypes.STRING,
    defaultValue: 'Event Playlist'
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true
});

module.exports = Playlist;