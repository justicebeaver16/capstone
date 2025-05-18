'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    if (queryInterface.sequelize.getDialect() === 'postgres') {
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
    }
  },

  async down(queryInterface, Sequelize) {
    if (queryInterface.sequelize.getDialect() === 'postgres') {
      try {
        await queryInterface.removeConstraint('Users', 'fk_users_primary_event');
      } catch (error) {
        console.warn('Skipping constraint removal (not found):', error.message);
      }
    } else {
      console.warn('SQLite does not support named foreign key constraints. Skipping constraint removal.');
    }
  }
};

// 'use strict';

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.addConstraint('Users', {
//       fields: ['primaryEventId'],
//       type: 'foreign key',
//       name: 'fk_users_primary_event',
//       references: {
//         table: 'Events',
//         field: 'id'
//       },
//       onUpdate: 'CASCADE',
//       onDelete: 'SET NULL'
//     });
//   },

//   async down(queryInterface, Sequelize) {
//     await queryInterface.removeConstraint('Users', 'fk_users_primary_event');
//   }
// };