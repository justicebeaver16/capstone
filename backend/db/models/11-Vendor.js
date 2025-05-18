const { Model, DataTypes } = require('sequelize');

class Vendor extends Model {
  static associate(models) {
    Vendor.belongsTo(models.Event, {
      foreignKey: 'EventId'
    });
    Vendor.hasMany(models.EventParty, {
      foreignKey: 'VendorId'
    });
    Vendor.hasMany(models.VendorAttachment, {
  foreignKey: 'vendorId'
});
  }
}

module.exports = (sequelize) => {
  Vendor.init({
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
    },
    EventId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Events',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Vendor',
    schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : undefined,
    timestamps: true
  });

  return Vendor;
};