const { Model, DataTypes } = require('sequelize');

class Event extends Model {
  static associate(models) {
    Event.belongsTo(models.User, {
      foreignKey: 'UserId',
      as: 'creator'
    });

    Event.hasMany(models.Guest, { foreignKey: 'EventId' });
    Event.hasMany(models.Vendor, { foreignKey: 'EventId' });
    Event.hasMany(models.MoodBoard, { foreignKey: 'EventId' });
    Event.hasMany(models.Photo, { foreignKey: 'EventId' });
    Event.hasMany(models.Task, { foreignKey: 'EventId' });
    Event.hasMany(models.Table, { foreignKey: 'EventId' });
    Event.hasOne(models.EventParty, { foreignKey: 'EventId' });
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
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Event',
    schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : undefined,
    timestamps: true
  });

  return Event;
};