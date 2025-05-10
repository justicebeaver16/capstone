'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA;
    }

    await queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      artist: {
        type: Sequelize.STRING,
        allowNull: false
      },
      requestedByName: {
        type: Sequelize.STRING
      },
      requestType: {
        type: Sequelize.ENUM('slow-dance', 'dance-floor', 'general'),
        defaultValue: 'general'
      },
      approved: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      notes: {
        type: Sequelize.TEXT
      },
      eventId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Events',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      requestedById: {
        type: Sequelize.INTEGER,
        allowNull: true
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

    await queryInterface.dropTable('Songs', options);
  }
};