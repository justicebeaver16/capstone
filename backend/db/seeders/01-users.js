// 'use strict';

// const bcrypt = require('bcryptjs');

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA;
// }

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     const users = [
//       {
//         name: 'Olivia Martinez',
//         email: 'olivia.martinez@example.com',
//         password: bcrypt.hashSync('weddingready123', 10),
//         avatar: 'default-bride.png',
//         role: 'bride',
//         eventRole: 'Bride',
//         planningPermissions: 'full',
//         isVendor: false,
//         vendorId: null,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         name: 'Emily Rivera',
//         email: 'emily.rivera@example.com',
//         password: bcrypt.hashSync('password123', 10),
//         avatar: 'default-user.png',
//         role: 'planning_team',
//         eventRole: 'Design Assistant',
//         planningPermissions: 'edit',
//         isVendor: false,
//         vendorId: null,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         name: 'Sophia Kim',
//         email: 'sophia.kim@example.com',
//         password: bcrypt.hashSync('password123', 10),
//         avatar: 'default-user.png',
//         role: 'planning_team',
//         eventRole: 'Vendor Liaison',
//         planningPermissions: 'view',
//         isVendor: false,
//         vendorId: null,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         name: 'Admin User',
//         email: 'admin@example.com',
//         password: bcrypt.hashSync('password123', 10),
//         avatar: 'default-admin.png',
//         role: 'admin',
//         eventRole: null,
//         planningPermissions: 'full',
//         isVendor: false,
//         vendorId: null,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         name: 'Jane Smith',
//         email: 'bride@example.com',
//         password: bcrypt.hashSync('password123', 10),
//         avatar: 'default-bride.png',
//         role: 'bride',
//         eventRole: 'Bride',
//         planningPermissions: 'full',
//         isVendor: false,
//         vendorId: null,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         name: 'John Doe',
//         email: 'groom@example.com',
//         password: bcrypt.hashSync('password123', 10),
//         avatar: 'default-groom.png',
//         role: 'groom',
//         eventRole: 'Groom',
//         planningPermissions: 'full',
//         isVendor: false,
//         vendorId: null,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         name: 'Sarah Williams',
//         email: 'planner@example.com',
//         password: bcrypt.hashSync('password123', 10),
//         avatar: 'default-planner.png',
//         role: 'event_planner',
//         eventRole: 'Wedding Planner',
//         planningPermissions: 'full',
//         isVendor: false,
//         vendorId: null,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         name: 'Emily Johnson',
//         email: 'maid@example.com',
//         password: bcrypt.hashSync('password123', 10),
//         avatar: 'default-team.png',
//         role: 'planning_team',
//         eventRole: 'Maid of Honor',
//         planningPermissions: 'edit',
//         isVendor: false,
//         vendorId: null,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         name: 'Mike Thompson',
//         email: 'bestman@example.com',
//         password: bcrypt.hashSync('password123', 10),
//         avatar: 'default-team.png',
//         role: 'planning_team',
//         eventRole: 'Best Man',
//         planningPermissions: 'view',
//         isVendor: false,
//         vendorId: null,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         name: 'Lisa Davis',
//         email: 'bridesmaid@example.com',
//         password: bcrypt.hashSync('password123', 10),
//         avatar: 'default-attendee.png',
//         role: 'attendee',
//         eventRole: 'Bridesmaid',
//         planningPermissions: 'none',
//         isVendor: false,
//         vendorId: null,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         name: 'Catering Services',
//         email: 'catering@example.com',
//         password: bcrypt.hashSync('password123', 10),
//         avatar: 'default-vendor.png',
//         role: 'vendor',
//         eventRole: null,
//         planningPermissions: 'none',
//         isVendor: true,
//         vendorId: 1,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         name: 'Photography Studio',
//         email: 'photo@example.com',
//         password: bcrypt.hashSync('password123', 10),
//         avatar: 'default-vendor.png',
//         role: 'vendor',
//         eventRole: null,
//         planningPermissions: 'none',
//         isVendor: true,
//         vendorId: 2,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         name: 'Regular User',
//         email: 'user@example.com',
//         password: bcrypt.hashSync('password123', 10),
//         avatar: 'default-user.png',
//         role: 'user',
//         eventRole: null,
//         planningPermissions: 'none',
//         isVendor: false,
//         vendorId: null,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       }
//     ];

//     return await queryInterface.bulkInsert('Users', users, {
//       ...options,
//       ignoreDuplicates: true
//     });
//   },

//   async down(queryInterface, Sequelize) {
//     options.tableName = 'Users';
//     const Op = Sequelize.Op;

//     return await queryInterface.bulkDelete(options, {
//       email: {
//         [Op.in]: [
//           'olivia.martinez@example.com',
//           'emily.rivera@example.com',
//           'sophia.kim@example.com',
//           'admin@example.com',
//           'bride@example.com',
//           'groom@example.com',
//           'planner@example.com',
//           'maid@example.com',
//           'bestman@example.com',
//           'bridesmaid@example.com',
//           'catering@example.com',
//           'photo@example.com',
//           'user@example.com'
//         ]
//       }
//     }, options);
//   }
// };

'use strict';

const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const Op = Sequelize.Op;

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkDelete('Users', {
        email: {
          [Op.in]: [
            'olivia.martinez@example.com',
            'emily.rivera@example.com',
            'sophia.kim@example.com',
            'admin@example.com',
            'planner@example.com',
            'maid@example.com',
            'bestman@example.com',
            'bridesmaid@example.com',
            'catering@example.com',
            'photo@example.com',
            'user@example.com',
            'bride@example.com',
            'groom@example.com'
          ]
        }
      }, { ...options, transaction });

      await queryInterface.bulkInsert('Users', [
        {
          name: 'Olivia Martinez',
          email: 'olivia.martinez@example.com',
          password: bcrypt.hashSync('weddingready123', 10),
          avatar: 'default-bride.png',
          role: 'bride',
          eventRole: 'Bride',
          planningPermissions: 'full',
          isVendor: false,
          vendorId: null,
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Emily Rivera',
          email: 'emily.rivera@example.com',
          password: bcrypt.hashSync('password123', 10),
          avatar: 'default-user.png',
          role: 'planning_team',
          eventRole: 'Design Assistant',
          planningPermissions: 'edit',
          isVendor: false,
          vendorId: null,
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Sophia Kim',
          email: 'sophia.kim@example.com',
          password: bcrypt.hashSync('password123', 10),
          avatar: 'default-user.png',
          role: 'planning_team',
          eventRole: 'Vendor Liaison',
          planningPermissions: 'view',
          isVendor: false,
          vendorId: null,
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Admin User',
          email: 'admin@example.com',
          password: bcrypt.hashSync('password123', 10),
          avatar: 'default-admin.png',
          role: 'admin',
          eventRole: null,
          planningPermissions: 'full',
          isVendor: false,
          vendorId: null,
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Jane Smith',
          email: 'bride@example.com',
          password: bcrypt.hashSync('password123', 10),
          avatar: 'default-bride.png',
          role: 'bride',
          eventRole: 'Bride',
          planningPermissions: 'full',
          isVendor: false,
          vendorId: null,
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'John Doe',
          email: 'groom@example.com',
          password: bcrypt.hashSync('password123', 10),
          avatar: 'default-groom.png',
          role: 'groom',
          eventRole: 'Groom',
          planningPermissions: 'full',
          isVendor: false,
          vendorId: null,
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Sarah Williams',
          email: 'planner@example.com',
          password: bcrypt.hashSync('password123', 10),
          avatar: 'default-planner.png',
          role: 'event_planner',
          eventRole: 'Wedding Planner',
          planningPermissions: 'full',
          isVendor: false,
          vendorId: null,
          createdAt: now,
          updatedAt: new Date()
        },
        {
          name: 'Emily Johnson',
          email: 'maid@example.com',
          password: bcrypt.hashSync('password123', 10),
          avatar: 'default-team.png',
          role: 'planning_team',
          eventRole: 'Maid of Honor',
          planningPermissions: 'edit',
          isVendor: false,
          vendorId: null,
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Mike Thompson',
          email: 'bestman@example.com',
          password: bcrypt.hashSync('password123', 10),
          avatar: 'default-team.png',
          role: 'planning_team',
          eventRole: 'Best Man',
          planningPermissions: 'view',
          isVendor: false,
          vendorId: null,
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Lisa Davis',
          email: 'bridesmaid@example.com',
          password: bcrypt.hashSync('password123', 10),
          avatar: 'default-attendee.png',
          role: 'attendee',
          eventRole: 'Bridesmaid',
          planningPermissions: 'none',
          isVendor: false,
          vendorId: null,
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Catering Services',
          email: 'catering@example.com',
          password: bcrypt.hashSync('password123', 10),
          avatar: 'default-vendor.png',
          role: 'vendor',
          eventRole: null,
          planningPermissions: 'none',
          isVendor: true,
          vendorId: 1,
          createdAt: now,
          updatedAt: new Date()
        },
        {
          name: 'Photography Studio',
          email: 'photo@example.com',
          password: bcrypt.hashSync('password123', 10),
          avatar: 'default-vendor.png',
          role: 'vendor',
          eventRole: null,
          planningPermissions: 'none',
          isVendor: true,
          vendorId: 2,
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Regular User',
          email: 'user@example.com',
          password: bcrypt.hashSync('password123', 10),
          avatar: 'default-user.png',
          role: 'user',
          eventRole: null,
          planningPermissions: 'none',
          isVendor: false,
          vendorId: null,
          createdAt: now,
          updatedAt: now
        }
      ], { ...options, transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    options.tableName = 'Users';

    return queryInterface.bulkDelete(options, {
      email: {
        [Op.in]: [
          'olivia.martinez@example.com',
          'emily.rivera@example.com',
          'sophia.kim@example.com',
          'admin@example.com',
          'planner@example.com',
          'maid@example.com',
          'bestman@example.com',
          'bridesmaid@example.com',
          'catering@example.com',
          'photo@example.com',
          'user@example.com',
          'bride@example.com',
          'groom@example.com'
        ]
      }
    }, options);
  }
};