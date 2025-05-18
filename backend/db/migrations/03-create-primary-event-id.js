'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA;
    }
    const table = await queryInterface.describeTable(`${options}.Users`);

    if (!('primaryEventId' in table)) {
      await queryInterface.addColumn('Users', 'primaryEventId', {
        type: Sequelize.INTEGER,
        allowNull: true,
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
    let options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA;
    }
    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
        ALTER TABLE "Users"
        DROP CONSTRAINT IF EXISTS fk_users_primary_event;
      `);
    }

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