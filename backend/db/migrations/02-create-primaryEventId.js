'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('Users');
    if (!table.primaryEventId) {
      await queryInterface.addColumn('Users', 'primaryEventId', {
        type: Sequelize.INTEGER,
        allowNull: true
      });
    }

    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM pg_constraint WHERE conname = 'fk_users_primary_event'
          ) THEN
            ALTER TABLE "Users"
            ADD CONSTRAINT fk_users_primary_event
            FOREIGN KEY ("primaryEventId")
            REFERENCES "Events"("id")
            ON UPDATE CASCADE
            ON DELETE SET NULL;
          END IF;
        END
        $$;
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('Users');

    if (queryInterface.sequelize.getDialect() === 'postgres') {
      // Drop constraint if it exists
      await queryInterface.sequelize.query(`
        ALTER TABLE "Users"
        DROP CONSTRAINT IF EXISTS fk_users_primary_event;
      `);
    }

    // Drop column only if it still exists
    if (table.primaryEventId) {
      await queryInterface.removeColumn('Users', 'primaryEventId');
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