// 'use strict';

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA;
// }
// options.tableName = 'GuestAttendees';

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     const now = new Date();

//     // Fetch existing guests by name
//     const guests = await queryInterface.sequelize.query(
//       `SELECT id, "primaryName" FROM "Guests"`,
//       { type: Sequelize.QueryTypes.SELECT }
//     );

//     const getGuestId = (primaryName) => {
//       const match = guests.find(g => g.primaryName === primaryName);
//       if (!match) console.warn(`Guest not found: "${primaryName}"`);
//       return match?.id || null;
//     };

//     const rawAttendees = [
//       {
//         name: 'Jamie Johnson',
//         mealChoice: 'Vegetarian',
//         guestName: 'Alex Johnson'
//       },
//       {
//         name: 'Chris Lee',
//         mealChoice: 'Beef',
//         guestName: 'Morgan Lee'
//       },
//       {
//         name: 'Sam Lee',
//         mealChoice: 'Chicken',
//         guestName: 'Morgan Lee'
//       }
//     ];

//     const attendees = rawAttendees.map(a => ({
//       name: a.name,
//       mealChoice: a.mealChoice,
//       guestId: getGuestId(a.guestName),
//       createdAt: now,
//       updatedAt: now
//     })).filter(a => {
//       if (!a.guestId) {
//         console.warn(`Skipping "${a.name}" — guestId missing`);
//         return false;
//       }
//       return true;
//     });

//     if (attendees.length === 0) {
//       console.warn('No valid GuestAttendees to insert.');
//       return;
//     }

//     console.log(`Inserting ${attendees.length} GuestAttendees...`);
//     return queryInterface.bulkInsert(options.tableName, attendees, options);
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

    const Guests = await queryInterface.sequelize.query(
      `SELECT id, primaryName FROM "Guests"`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const getGuestId = (name) => {
      const match = Guests.find(g => g.primaryName === name);
      return match ? match.id : null;
    };

    const attendees = [
      {
        name: 'Jamie Johnson',
        mealChoice: 'Vegetarian',
        guestId: getGuestId('Alex Johnson'),
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Chris Lee',
        mealChoice: 'Beef',
        guestId: getGuestId('Morgan Lee'),
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Sam Lee',
        mealChoice: 'Chicken',
        guestId: getGuestId('Morgan Lee'),
        createdAt: now,
        updatedAt: now
      }
    ].filter(a => a.guestId); // only keep valid records

    if (attendees.length === 0) {
      console.warn('No GuestAttendees to insert. Skipping...');
      return;
    }

    return queryInterface.bulkInsert('GuestAttendees', attendees, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'GuestAttendees';
    return queryInterface.bulkDelete(options, null, {});
  }
};