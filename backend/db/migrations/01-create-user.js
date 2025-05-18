'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;
    let options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA;
    }

    // Create ENUM type for planningPermissions in Postgres
    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM pg_type WHERE typname = 'enum_Users_planningPermissions'
          ) THEN
            CREATE TYPE "enum_Users_planningPermissions" AS ENUM ('none', 'view', 'edit', 'full');
          END IF;
        END$$;
      `);
    }

    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      avatar: {
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.ENUM(
          'user',
          'admin',
          'bride',
          'groom',
          'event_planner',
          'planning_team',
          'vendor',
          'attendee'
        ),
        defaultValue: 'user'
      },
      eventRole: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Specific role in the event (e.g., "Mother of the Bride", "Best Man", "Bridesmaid")'
      },
      planningPermissions: {
        type: queryInterface.sequelize.getDialect() === 'postgres'
          ? '"enum_Users_planningPermissions"' // Must be quoted and case-matched
          : DataTypes.STRING,
        defaultValue: 'none',
        comment: 'Access level for event planning features'
      },
      isVendor: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      vendorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'Reference to vendor table if user is associated with vendor'
      },
      primaryEventId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'Primary event this user is associated with',
        references: {
          model: 'Events',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      resetPasswordToken: {
        type: DataTypes.STRING
      },
      resetPasswordExpire: {
        type: DataTypes.DATE
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
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

    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_Users_planningPermissions";`);
      await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_Users_role";`);
    }
  }
};

// 'use strict';

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     const { DataTypes } = Sequelize;
//     let options = {};
//     if (process.env.NODE_ENV === 'production') {
//       options.schema = process.env.SCHEMA;
//     }

//     await queryInterface.createTable('Users', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       name: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       email: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true
//       },
//       password: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       avatar: {
//         type: Sequelize.STRING
//       },
//       role: {
//         type: Sequelize.ENUM('user', 'admin', 'bride', 'groom', 'event_planner', 'planning_team', 'vendor', 'attendee'),
//         defaultValue: 'user'
//       },
//       eventRole: {
//         type: Sequelize.STRING,
//         allowNull: true,
//         comment: 'Specific role in the event (e.g., "Mother of the Bride", "Best Man", "Bridesmaid")'
//       },
//       planningPermissions: {
//   type: Sequelize.STRING,
//   defaultValue: 'none',
//   comment: 'Access level for event planning features'
// },
//       isVendor: {
//         type: Sequelize.BOOLEAN,
//         defaultValue: false
//       },
//       vendorId: {
//         type: Sequelize.INTEGER,
//         allowNull: true,
//         comment: 'Reference to vendor table if user is associated with vendor'
//       },
//       primaryEventId: {
//         type: Sequelize.INTEGER,
//         allowNull: true,
//         comment: 'Primary event this user is associated with',
//         references: {
//           model: 'Events',
//           key: 'id'
//         },
//         onUpdate: 'CASCADE',
//         onDelete: 'SET NULL'
//       },
//       resetPasswordToken: {
//         type: Sequelize.STRING
//       },
//       resetPasswordExpire: {
//         type: Sequelize.DATE
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//       }
//     }, options);
//   },

//   async down(queryInterface, Sequelize) {
//     let options = {};
//     if (process.env.NODE_ENV === 'production') {
//       options.schema = process.env.SCHEMA;
//     }

//     await queryInterface.dropTable('Users', options);
//   }
// };