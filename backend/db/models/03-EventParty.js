const { Model, DataTypes } = require('sequelize');

class EventParty extends Model {
  static associate(models) {
    EventParty.belongsTo(models.Event, { foreignKey: 'EventId' });
    EventParty.belongsTo(models.Vendor, { foreignKey: 'VendorId' });
  }
}

module.exports = (sequelize) => {
  EventParty.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING
    },
    responsibilities: {
      type: DataTypes.TEXT
    },
    notes: {
      type: DataTypes.TEXT
    },
    EventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Events',
        key: 'id'
      }
    },
    VendorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Vendors',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'EventParty',
    schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : undefined,
    timestamps: true
  });

  return EventParty;
};