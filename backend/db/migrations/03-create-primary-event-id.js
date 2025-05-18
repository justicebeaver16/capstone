'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA;
    }
    // console.log('Before describe');
    const table = await queryInterface.describeTable("Users", {schema:'capstone_schema'});
// console.log('After describe');
// console.log('Before if');
    if (!('primaryEventId' in table)) {
      await queryInterface.addColumn('capstone_schema.Users', 'primaryEventId', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });
    }
// console.log('After if');
    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM pg_constraint WHERE conname = 'fk_users_primary_event'
          ) THEN
            ALTER TABLE capstone_schema."Users"
            ADD CONSTRAINT fk_users_primary_event
            FOREIGN KEY ("primaryEventId")
            REFERENCES capstone_schema."Events"("id")
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