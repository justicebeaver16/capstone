const { Model, DataTypes } = require('sequelize');

class Photo extends Model {
  static associate(models) {
    Photo.belongsTo(models.User, { as: 'uploadedBy', foreignKey: 'uploadedById' });
    Photo.belongsTo(models.Event, { foreignKey: 'EventId' });
  }
}

module.exports = (sequelize) => {
  Photo.init({
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thumbnailUrl: {
      type: DataTypes.STRING
    },
    tags: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    uploadedById: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    EventId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Photo',
    schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : undefined,
    timestamps: true
  });

  return Photo;
};