'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // Fetch EventParties and Users
    const EventParties = await queryInterface.sequelize.query(
      `SELECT id, name FROM capstone_schema."EventParties"`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const Users = await queryInterface.sequelize.query(
      `SELECT id, email FROM capstone_schema."Users"`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const getEventPartyId = (name) => {
      const match = EventParties.find(ep => ep.name === name);
      if (!match) console.warn(`EventParty not found: "${name}"`);
      return match ? match.id : null;
    };

    const getUserId = (email) => {
      const match = Users.find(u => u.email === email);
      if (!match) console.warn(`User not found: "${email}"`);
      return match ? match.id : null;
    };

    const members = [
      {
        name: 'Emily Rivera',
        email: 'emily.rivera@example.com',
        phone: '555-1234',
        role: 'Design Assistant',
        notes: 'Supports floral and lighting coordination',
        EventPartyId: getEventPartyId('Miller-Johnson Ceremony Designer'),
        UserId: getUserId('emily.rivera@example.com'),
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Liam Perez',
        email: 'liam.perez@example.com',
        phone: '555-5678',
        role: 'AV Support',
        notes: 'Handles projector and audio setup',
        EventPartyId: getEventPartyId('Wilson Corporate Gala AV'),
        UserId: null,
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Sophia Kim',
        email: 'sophia.kim@example.com',
        phone: '555-4444',
        role: 'Vendor Liaison',
        notes: 'Coordinates communication with vendors',
        EventPartyId: getEventPartyId('Wilson Corporate Gala AV'),
        UserId: getUserId('sophia.kim@example.com'),
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Noah Bennett',
        email: 'noah.bennett@example.com',
        phone: '555-8888',
        role: 'Reception Coordinator',
        notes: 'Coordinates timeline and seating for reception',
        EventPartyId: getEventPartyId('Miller-Johnson Lead Planner'),
        UserId: null,
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Ava Chen',
        email: 'ava.chen@example.com',
        phone: '555-9999',
        role: 'Logistics Support',
        notes: 'Handles transportation and parking',
        EventPartyId: getEventPartyId('Clark Anniversary Florist'),
        UserId: null,
        createdAt: now,
        updatedAt: now
      }
    ];

    const validMembers = members.filter(m => m.EventPartyId);

    if (validMembers.length === 0) {
      console.warn('No valid members to insert.');
      return;
    }

    console.log('Inserting members:', validMembers.map(m => ({ name: m.name, EventPartyId: m.EventPartyId })));

    return queryInterface.bulkInsert({tableName: "Members", schema: "capstone_schema"}, validMembers, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Members';
    return queryInterface.bulkDelete(options, null, {});
  }
};