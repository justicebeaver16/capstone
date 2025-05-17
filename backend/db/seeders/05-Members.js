// 'use strict';

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA;
// }
// options.tableName = 'Members';

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     const now = new Date();

//     const [eventParties] = await queryInterface.sequelize.query(
//       `SELECT id, name FROM "EventParties";`
//     );
//     const [users] = await queryInterface.sequelize.query(
//       `SELECT id, email FROM "Users";`
//     );

//     const getEventPartyId = (name) => {
//       const match = eventParties.find(ep => ep.name === name);
//       if (!match) console.warn(`EventParty not found: "${name}"`);
//       return match?.id || null;
//     };

//     const getUserId = (email) => {
//       const match = users.find(u => u.email === email);
//       if (!match) console.warn(`User not found: "${email}"`);
//       return match?.id || null;
//     };

//     const rawMembers = [
//       {
//         name: 'Emily Rivera',
//         email: 'emily.rivera@example.com',
//         phone: '555-1234',
//         role: 'Design Assistant',
//         notes: 'Supports floral and lighting coordination',
//         eventPartyName: 'Miller-Johnson Ceremony Designer',
//         userEmail: 'emily.rivera@example.com'
//       },
//       {
//         name: 'Liam Perez',
//         email: 'liam.perez@example.com',
//         phone: '555-5678',
//         role: 'AV Support',
//         notes: 'Handles projector and audio setup',
//         eventPartyName: 'Wilson Corporate Gala AV',
//         userEmail: null
//       },
//       {
//         name: 'Sophia Kim',
//         email: 'sophia.kim@example.com',
//         phone: '555-4444',
//         role: 'Vendor Liaison',
//         notes: 'Coordinates communication with vendors',
//         eventPartyName: 'Wilson Corporate Gala AV',
//         userEmail: 'sophia.kim@example.com'
//       },
//       {
//         name: 'Noah Bennett',
//         email: 'noah.bennett@example.com',
//         phone: '555-8888',
//         role: 'Reception Coordinator',
//         notes: 'Coordinates timeline and seating for reception',
//         eventPartyName: 'Miller-Johnson Lead Planner',
//         userEmail: null
//       },
//       {
//         name: 'Ava Chen',
//         email: 'ava.chen@example.com',
//         phone: '555-9999',
//         role: 'Logistics Support',
//         notes: 'Handles transportation and parking',
//         eventPartyName: 'Clark Anniversary Florist',
//         userEmail: null
//       }
//     ];

//     const membersToInsert = rawMembers.map((m) => ({
//       name: m.name,
//       email: m.email,
//       phone: m.phone,
//       role: m.role,
//       notes: m.notes,
//       EventPartyId: getEventPartyId(m.eventPartyName),
//       UserId: m.userEmail ? getUserId(m.userEmail) : null,
//       createdAt: now,
//       updatedAt: now
//     })).filter(member => {
//       if (!member.EventPartyId) {
//         console.warn(`Skipping "${member.name}" due to missing EventPartyId`);
//         return false;
//       }
//       return true;
//     });

//     if (membersToInsert.length === 0) {
//       console.warn('No valid Members to insert.');
//       return;
//     }

//     console.log(`Inserting ${membersToInsert.length} Members...`);
//     return queryInterface.bulkInsert(options.tableName, membersToInsert, options);
//   },

//   async down(queryInterface, Sequelize) {
//     return queryInterface.bulkDelete(options, null, options);
//   }
// };

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
      `SELECT id, name FROM "EventParties"`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const Users = await queryInterface.sequelize.query(
      `SELECT id, email FROM "Users"`,
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

    return queryInterface.bulkInsert('Members', validMembers, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Members';
    return queryInterface.bulkDelete(options, null, {});
  }
};