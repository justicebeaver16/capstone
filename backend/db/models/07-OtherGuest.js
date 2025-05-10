const { Model, DataTypes } = require('sequelize');

class OtherGuest extends Model {
  static associate(models) {
    OtherGuest.belongsTo(models.Guest, { foreignKey: 'guestId' });
  }
}

module.exports = (sequelize) => {
  OtherGuest.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    guestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Guests',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'OtherGuest',
    schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : undefined,
    timestamps: false
  });

  return OtherGuest;
};