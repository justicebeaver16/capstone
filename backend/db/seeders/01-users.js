console.log('Running 01-users.js seeder...');

'use strict';

const { User } = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
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
        primaryEventId: 1,
        resetPasswordToken: null,
        resetPasswordExpire: null
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
        primaryEventId: 1,
        resetPasswordToken: null,
        resetPasswordExpire: null
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
        primaryEventId: null,
        resetPasswordToken: null,
        resetPasswordExpire: null
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
        primaryEventId: 1,
        resetPasswordToken: null,
        resetPasswordExpire: null
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
        primaryEventId: 1,
        resetPasswordToken: null,
        resetPasswordExpire: null
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
        primaryEventId: 1,
        resetPasswordToken: null,
        resetPasswordExpire: null
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
        primaryEventId: 1,
        resetPasswordToken: null,
        resetPasswordExpire: null
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
        primaryEventId: 1,
        resetPasswordToken: null,
        resetPasswordExpire: null
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
        primaryEventId: 1,
        resetPasswordToken: null,
        resetPasswordExpire: null
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
        primaryEventId: 1,
        resetPasswordToken: null,
        resetPasswordExpire: null
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
        primaryEventId: 1,
        resetPasswordToken: null,
        resetPasswordExpire: null
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
        primaryEventId: null,
        resetPasswordToken: null,
        resetPasswordExpire: null
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;

    return await queryInterface.bulkDelete(options, {
      email: {
        [Op.in]: [
          'emily.rivera@example.com',
          'sophia.kim@example.com',
          'admin@example.com',
          'admin@example.com',
          'bride@example.com',
          'groom@example.com',
          'planner@example.com',
          'maid@example.com',
          'bestman@example.com',
          'bridesmaid@example.com',
          'catering@example.com',
          'photo@example.com',
          'user@example.com'
        ]
      }
    }, options);
  }
};