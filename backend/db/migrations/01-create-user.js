'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA;
    }

    await queryInterface.createTable('Users', {
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
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      avatar: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.ENUM('user', 'admin', 'bride', 'groom', 'event_planner', 'planning_team', 'vendor', 'attendee'),
        defaultValue: 'user'
      },
      eventRole: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Specific role in the event (e.g., "Mother of the Bride", "Best Man", "Bridesmaid")'
      },
      planningPermissions: {
        type: Sequelize.ENUM('none', 'view', 'edit', 'full'),
        defaultValue: 'none',
        comment: 'Access level for event planning features'
      },
      isVendor: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      vendorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'Reference to vendor table if user is associated with vendor'
      },
      primaryEventId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'Primary event this user is associated with'
      },
      resetPasswordToken: {
        type: Sequelize.STRING
      },
      resetPasswordExpire: {
        type: Sequelize.DATE
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

    await queryInterface.dropTable('Users', options);
  }
};