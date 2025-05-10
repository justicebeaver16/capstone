const { Model, DataTypes } = require('sequelize');

class Table extends Model {
  static associate(models) {
    Table.hasMany(models.Seat);
  }
}

module.exports = (sequelize) => {
  Table.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      defaultValue: 8
    },
    tableType: {
      type: DataTypes.ENUM('round', 'rectangular', 'custom'),
      defaultValue: 'round'
    },
    positionX: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    positionY: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Table',
    schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : undefined,
    timestamps: true
  });

  return Table;
};