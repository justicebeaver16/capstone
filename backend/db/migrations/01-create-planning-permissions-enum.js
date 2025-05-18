'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_Users_planningPermissions') THEN
            CREATE TYPE "enum_Users_planningPermissions" AS ENUM ('none', 'view', 'edit', 'full');
          END IF;
        END$$;
      `);

      await queryInterface.sequelize.query(`
        ALTER TABLE "Users"
        ALTER COLUMN "planningPermissions" TYPE "enum_Users_planningPermissions"
        USING "planningPermissions"::"enum_Users_planningPermissions";
      `);

      await queryInterface.sequelize.query(`
        ALTER TABLE "Users"
        ALTER COLUMN "planningPermissions"
        SET DEFAULT 'none';
      `);

      await queryInterface.sequelize.query(`
        COMMENT ON COLUMN "Users"."planningPermissions" IS 'Access level for event planning features';
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    if (queryInterface.sequelize.getDialect() === 'postgres') {
      // Remove default value before changing column type
      await queryInterface.sequelize.query(`
        ALTER TABLE "Users"
        ALTER COLUMN "planningPermissions"
        DROP DEFAULT;
      `);

      // Change to generic string type
      await queryInterface.sequelize.query(`
        ALTER TABLE "Users"
        ALTER COLUMN "planningPermissions" TYPE VARCHAR;
      `);

      // Now it’s safe to drop the ENUM type
      await queryInterface.sequelize.query(`
        DROP TYPE IF EXISTS "enum_Users_planningPermissions";
      `);
    }
  }
};

// 'use strict';

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     if (queryInterface.sequelize.getDialect() === 'postgres') {
//       await queryInterface.sequelize.query(`
//         DO $$
//         BEGIN
//           IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_Users_planningPermissions') THEN
//             CREATE TYPE "enum_Users_planningPermissions" AS ENUM ('none', 'view', 'edit', 'full');
//           END IF;
//         END$$;
//       `);

//       await queryInterface.sequelize.query(`
//         ALTER TABLE "Users"
//         ALTER COLUMN "planningPermissions" TYPE "enum_Users_planningPermissions"
//         USING "planningPermissions"::"enum_Users_planningPermissions";
//       `);

//       await queryInterface.sequelize.query(`
//         COMMENT ON COLUMN "Users"."planningPermissions" IS 'Access level for event planning features';
//       `);
//     }
//   },

//   async down(queryInterface, Sequelize) {
//     if (queryInterface.sequelize.getDialect() === 'postgres') {
//       await queryInterface.sequelize.query(`
//         ALTER TABLE "Users"
//         ALTER COLUMN "planningPermissions" TYPE VARCHAR;
//       `);

//       await queryInterface.sequelize.query(`
//         DROP TYPE IF EXISTS "enum_Users_planningPermissions";
//       `);
//     }
//   }
// };