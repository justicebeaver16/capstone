const { Model, DataTypes } = require('sequelize');

class MoodBoard extends Model {
  static associate(models) {
    MoodBoard.belongsTo(models.Event);
    MoodBoard.hasMany(models.MoodBoardItem);
  }
}

module.exports = (sequelize) => {
  MoodBoard.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'MoodBoard',
    schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : undefined,
    timestamps: true
  });

  return MoodBoard;
};