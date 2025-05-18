'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Users', {
      fields: ['primaryEventId'],
      type: 'foreign key',
      name: 'fk_users_primary_event',
      references: {
        table: 'Events',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Users', 'fk_users_primary_event');
  }
};