'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA;
    }

    await queryInterface.createTable('GuestAttendees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mealChoice: {
        type: Sequelize.STRING
      },
      guestId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Guests',
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

    await queryInterface.dropTable('GuestAttendees', options);
  }
};