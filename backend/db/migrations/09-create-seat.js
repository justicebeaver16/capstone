'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA;
    }

    await queryInterface.createTable('Seats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      seatNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      guestName: {
        type: Sequelize.STRING
      },
      assigned: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      guestId: { // Optional FK, no enforced constraint
        type: Sequelize.INTEGER,
        allowNull: true
        // Constraint disabled per model definition (constraints: false)
      },
      tableId: { // FK to Tables
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tables',
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

    await queryInterface.dropTable('Seats', options);
  }
};