// 'use strict';

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA;
// }
// options.tableName = 'OtherGuests';

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     const now = new Date();

//     // Fetch all guests from the DB to map names to IDs
//     const guests = await queryInterface.sequelize.query(
//       `SELECT id, "primaryName" FROM "Guests"`,
//       { type: Sequelize.QueryTypes.SELECT }
//     );

//     const getGuestId = (primaryName) => {
//       const match = guests.find(g => g.primaryName === primaryName);
//       if (!match) console.warn(`Guest not found: "${primaryName}"`);
//       return match?.id || null;
//     };

//     const rawOtherGuests = [
//       { name: 'Jamie Johnson', guestName: 'Alex Johnson' },
//       { name: 'Chris Lee', guestName: 'Morgan Lee' },
//       { name: 'Sam Lee', guestName: 'Morgan Lee' }
//     ];

//     const otherGuests = rawOtherGuests.map(g => ({
//       name: g.name,
//       guestId: getGuestId(g.guestName),
//       createdAt: now,
//       updatedAt: now
//     })).filter(g => {
//       if (!g.guestId) {
//         console.warn(`Skipping "${g.name}" due to missing guestId`);
//         return false;
//       }
//       return true;
//     });

//     if (otherGuests.length === 0) {
//       console.warn('No valid OtherGuests to insert. Skipping...');
//       return;
//     }

//     console.log(`Inserting ${otherGuests.length} OtherGuests...`);
//     return queryInterface.bulkInsert(options.tableName, otherGuests, options);
//   },

//   async down(queryInterface, Sequelize) {
//     return queryInterface.bulkDelete(options.tableName, null, options);
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

    // Load Guests to resolve guestId
    const guests = await queryInterface.sequelize.query(
      `SELECT id, primaryName FROM "Guests"`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const getGuestId = (name) => {
      const match = guests.find(g => g.primaryName === name);
      return match ? match.id : null;
    };

    const otherGuests = [
      {
        name: 'Jamie Johnson',
        guestId: getGuestId('Alex Johnson'),
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Chris Lee',
        guestId: getGuestId('Morgan Lee'),
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Sam Lee',
        guestId: getGuestId('Morgan Lee'),
        createdAt: now,
        updatedAt: now
      }
    ].filter(g => g.guestId); // Remove any that failed guestId lookup

    if (otherGuests.length === 0) {
      console.warn('No OtherGuests to insert. Skipping...');
      return;
    }

    return queryInterface.bulkInsert('OtherGuests', otherGuests, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'OtherGuests';
    return queryInterface.bulkDelete(options, null, {});
  }
};