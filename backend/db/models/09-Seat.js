const { Model, DataTypes } = require('sequelize');

class Seat extends Model {
  static associate(models) {
    Seat.belongsTo(models.Guest, { constraints: false });
    Seat.belongsTo(models.Table);
  }
}

module.exports = (sequelize) => {
  Seat.init({
    seatNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    guestName: {
      type: DataTypes.STRING
    },
    assigned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Seat',
    schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : undefined,
    timestamps: true
  });

  return Seat;
};