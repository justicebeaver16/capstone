const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Vendor = sequelize.define('Vendor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contactName: {
    type: DataTypes.STRING
  },
  contactEmail: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    }
  },
  contactPhone: {
    type: DataTypes.STRING
  },
  website: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  city: {
    type: DataTypes.STRING
  },
  state: {
    type: DataTypes.STRING
  },
  zipCode: {
    type: DataTypes.STRING
  },
  latitude: {
    type: DataTypes.FLOAT
  },
  longitude: {
    type: DataTypes.FLOAT
  },
  priceAmount: {
    type: DataTypes.FLOAT
  },
  priceCurrency: {
    type: DataTypes.STRING,
    defaultValue: 'USD'
  },
  priceNote: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.TEXT
  },
  notes: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('considering', 'contacted', 'booked', 'confirmed', 'paid', 'completed', 'cancelled'),
    defaultValue: 'considering'
  },
  rating: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  },
  tags: {
    type: DataTypes.JSON,
    defaultValue: []
  }
}, {
  schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : undefined,
  timestamps: true
});

module.exports = Vendor;