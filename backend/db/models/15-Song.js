const { Model, DataTypes } = require('sequelize');

class Song extends Model {
  static associate(models) {
    Song.belongsTo(models.User, {
      as: 'requestedBy',
      foreignKey: 'requestedById',
      constraints: false
    });
    Song.belongsTo(models.Event, {
      foreignKey: 'eventId'
    });
  }
}

module.exports = (sequelize) => {
  Song.init({
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
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Events',
        key: 'id'
      }
    },
    requestedById: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Song',
    schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : undefined,
    timestamps: true
  });

  return Song;
};