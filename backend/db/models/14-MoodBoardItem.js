const { Model, DataTypes } = require('sequelize');

class MoodBoardItem extends Model {
  static associate(models) {
    MoodBoardItem.belongsTo(models.MoodBoard);
  }
}

module.exports = (sequelize) => {
  MoodBoardItem.init({
    type: {
      type: DataTypes.ENUM('image', 'note', 'link'),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    source: {
      type: DataTypes.STRING
    },
    tags: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    positionX: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    positionY: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    width: {
      type: DataTypes.INTEGER,
      defaultValue: 200
    },
    height: {
      type: DataTypes.INTEGER,
      defaultValue: 200
    },
    moodBoardId: { // Foreign key to MoodBoards table
        type: DataTypes.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
  }, {
    sequelize,
    modelName: 'MoodBoardItem',
    schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : undefined,
    timestamps: true
  });

  return MoodBoardItem;
};