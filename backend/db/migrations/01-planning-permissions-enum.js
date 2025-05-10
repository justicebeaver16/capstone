'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Skip for dev
    if (queryInterface.sequelize.getDialect() !== 'postgres') {
      return Promise.resolve();
    }

    await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        CREATE TYPE "enum_Users_planningPermissions" AS ENUM ('none', 'view', 'edit', 'full');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END$$;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    if (queryInterface.sequelize.getDialect() !== 'postgres') {
      return Promise.resolve();
    }

    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS "enum_Users_planningPermissions";
    `);
  }
};