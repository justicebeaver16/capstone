const { Model, DataTypes } = require('sequelize');

class Task extends Model {
  static associate(models) {
    Task.belongsTo(models.Member);
  }
}

module.exports = (sequelize) => {
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    dueDate: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM('not-started', 'in-progress', 'completed'),
      defaultValue: 'not-started'
    },
    notes: {
      type: DataTypes.TEXT
    },
    MemberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
    EventId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Events',
        key: 'id'
      },
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Task',
    schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : undefined,
    timestamps: true
  });

  return Task;
};