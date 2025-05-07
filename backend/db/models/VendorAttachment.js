const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const VendorAttachment = sequelize.define('VendorAttachment', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING
  }
}, {
  schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : undefined,
  timestamps: true
});

module.exports = VendorAttachment;