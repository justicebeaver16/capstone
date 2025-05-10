const { Model, DataTypes } = require('sequelize');

class Event extends Model {
  static associate(models) {
    Event.hasMany(models.Guest);
    Event.belongsTo(models.User);
    Event.hasMany(models.Vendor);
    Event.hasMany(models.MoodBoard);
    Event.hasOne(models.EventParty);
    Event.hasMany(models.Photo);
  }
}

module.exports = (sequelize) => {
  Event.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
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
    description: {
      type: DataTypes.TEXT
    },
    eventType: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM('planning', 'upcoming', 'completed', 'cancelled'),
      defaultValue: 'planning'
    }
  }, {
    sequelize,
    modelName: 'Event',
    schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : undefined,
    timestamps: true
  });

  return Event;
};