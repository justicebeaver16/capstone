'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA;
    }

    await queryInterface.createTable('MoodBoardItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.ENUM('image', 'note', 'link'),
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      source: {
        type: Sequelize.STRING
      },
      tags: {
        type: Sequelize.JSON,
        defaultValue: []
      },
      positionX: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      positionY: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      width: {
        type: Sequelize.INTEGER,
        defaultValue: 200
      },
      height: {
        type: Sequelize.INTEGER,
        defaultValue: 200
      },
      moodBoardId: { // Foreign key to MoodBoards table
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'MoodBoards',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },

  async down(queryInterface, Sequelize) {
    let options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA;
    }

    await queryInterface.dropTable('MoodBoardItems', options);
  }
};