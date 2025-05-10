'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA;
    }

    await queryInterface.createTable('Guests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      primaryName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      primaryEmail: {
        type: Sequelize.STRING,
        allowNull: false
      },
      otherGuests: {
        type: Sequelize.JSON,
        defaultValue: []
      },
      numberInParty: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      relation: {
        type: Sequelize.STRING
      },
      rsvpStatus: {
        type: Sequelize.ENUM('pending', 'accepted', 'declined'),
        defaultValue: 'pending'
      },
      rsvpDate: {
        type: Sequelize.DATE
      },
      actualAttendees: {
        type: Sequelize.JSON,
        defaultValue: []
      },
      slowDanceSong: {
        type: Sequelize.STRING
      },
      danceSong: {
        type: Sequelize.STRING
      },
      sentReminder: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      reminderDate: {
        type: Sequelize.DATE
      },
      qrCode: {
        type: Sequelize.STRING
      },
      eventId: { // Foreign key to Events table
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Events',
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

    await queryInterface.dropTable('Guests', options);
  }
};