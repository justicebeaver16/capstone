const { Model, DataTypes } = require('sequelize');

class Member extends Model {
  static associate(models) {
    Member.belongsTo(models.EventParty);
    Member.belongsTo(models.User, { constraints: false });
    Member.hasMany(models.Task);
  }
}

module.exports = (sequelize) => {
  Member.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'Member',
    schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : undefined,
    timestamps: true
  });

  return Member;
};