const { Model, DataTypes } = require('sequelize');

class Guest extends Model {
  static associate(models) {
    Guest.belongsTo(models.Event);
  }
}

module.exports = (sequelize) => {
  Guest.init({
    primaryName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    primaryEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    otherGuests: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    numberInParty: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    relation: {
      type: DataTypes.STRING
    },
    rsvpStatus: {
      type: DataTypes.ENUM('pending', 'accepted', 'declined'),
      defaultValue: 'pending'
    },
    rsvpDate: {
      type: DataTypes.DATE
    },
    actualAttendees: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    slowDanceSong: {
      type: DataTypes.STRING
    },
    danceSong: {
      type: DataTypes.STRING
    },
    sentReminder: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    reminderDate: {
      type: DataTypes.DATE
    },
    qrCode: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Guest',
    schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : undefined,
    timestamps: true
  });

  return Guest;
};