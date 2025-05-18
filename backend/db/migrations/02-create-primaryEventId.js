'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('Users');

    // Add the column only if it doesn't exist
    if (!('primaryEventId' in table)) {
      await queryInterface.addColumn('Users', 'primaryEventId', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });
    }

    // Add foreign key constraint if it doesn't exist (Postgres only)
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
    // Drop foreign key constraint if it exists (Postgres only)
    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
        ALTER TABLE "Users"
        DROP CONSTRAINT IF EXISTS fk_users_primary_event;
      `);
    }

    // Attempt to drop the column safely
    try {
      const table = await queryInterface.describeTable('Users');

      if ('primaryEventId' in table) {
        await queryInterface.removeColumn('Users', 'primaryEventId');
      }
    } catch (err) {
      console.warn('Skipping drop of primaryEventId column — it may not exist:', err.message);
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