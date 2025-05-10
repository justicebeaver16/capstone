const { Model, DataTypes } = require('sequelize');

class GuestAttendee extends Model {
  static associate(models) {
    GuestAttendee.belongsTo(models.Guest, { foreignKey: 'guestId' });
  }
}

module.exports = (sequelize) => {
  GuestAttendee.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mealChoice: {
      type: DataTypes.STRING
    },
    guestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Guests',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'GuestAttendee',
    schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : undefined,
    timestamps: false
  });

  return GuestAttendee;
};