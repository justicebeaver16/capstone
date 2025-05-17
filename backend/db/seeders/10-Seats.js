// 'use strict';

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA;
// }
// options.tableName = 'Seats';

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     const now = new Date();

//     const [tables] = await queryInterface.sequelize.query(
//       `SELECT id, name FROM "Tables";`,
//       { type: Sequelize.QueryTypes.SELECT }
//     );

//     const [guests] = await queryInterface.sequelize.query(
//       `SELECT id, "primaryName" FROM "Guests";`,
//       { type: Sequelize.QueryTypes.SELECT }
//     );

//     const getTableId = (name) => {
//       const match = tables.find(t => t.name === name);
//       if (!match) console.warn(`Table not found: "${name}"`);
//       return match?.id || null;
//     };

//     const getGuestId = (name) => {
//       const match = guests.find(g => g.primaryName === name);
//       if (!match) console.warn(`Guest not found: "${name}"`);
//       return match?.id || null;
//     };

//     const rawSeats = [
//       // Table A
//       {
//         seatNumber: 1,
//         guestName: 'Alex Johnson',
//         assigned: true,
//         guestId: getGuestId('Alex Johnson'),
//         tableName: 'Table A'
//       },
//       {
//         seatNumber: 2,
//         guestName: 'Jamie Johnson', // not in Guests table
//         assigned: true,
//         guestId: null,
//         tableName: 'Table A'
//       },
//       {
//         seatNumber: 3,
//         assigned: false,
//         tableName: 'Table A'
//       },

//       // Sweetheart Table
//       {
//         seatNumber: 1,
//         guestName: 'Taylor Smith',
//         assigned: true,
//         guestId: getGuestId('Taylor Smith'),
//         tableName: 'Sweetheart Table'
//       },

//       // Table B
//       {
//         seatNumber: 1,
//         assigned: false,
//         tableName: 'Table B'
//       },
//       {
//         seatNumber: 2,
//         guestName: 'Morgan Lee',
//         assigned: true,
//         guestId: getGuestId('Morgan Lee'),
//         tableName: 'Table B'
//       }
//     ];

//     const seats = rawSeats.map(s => ({
//       seatNumber: s.seatNumber,
//       guestName: s.guestName || null,
//       assigned: s.assigned,
//       guestId: s.guestId || null,
//       tableId: getTableId(s.tableName),
//       createdAt: now,
//       updatedAt: now
//     })).filter(seat => seat.tableId);

//     if (seats.length === 0) {
//       console.warn('No valid seats to insert. Aborting.');
//       return;
//     }

//     console.log('Inserting seats:', seats.map(s => ({
//       seatNumber: s.seatNumber,
//       tableId: s.tableId,
//       guestName: s.guestName
//     })));

//     return queryInterface.bulkInsert(options.tableName, seats, options);
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

    // Fetch Tables and Guests
    const Tables = await queryInterface.sequelize.query(
      `SELECT id, name FROM "Tables"`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const Guests = await queryInterface.sequelize.query(
      `SELECT id, "primaryName" FROM "Guests"`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const getTableId = (name) => {
      const table = Tables.find(t => t.name === name);
      return table ? table.id : null;
    };

    const getGuestId = (name) => {
      const guest = Guests.find(g => g.primaryName === name);
      return guest ? guest.id : null;
    };

    const seats = [
      // Table A
      {
        seatNumber: 1,
        guestName: 'Alex Johnson',
        assigned: true,
        guestId: getGuestId('Alex Johnson'),
        tableId: getTableId('Table A'),
        createdAt: now,
        updatedAt: now
      },
      {
        seatNumber: 2,
        guestName: 'Jamie Johnson',
        assigned: true,
        guestId: null, // not in Guests table
        tableId: getTableId('Table A'),
        createdAt: now,
        updatedAt: now
      },
      {
        seatNumber: 3,
        assigned: false,
        tableId: getTableId('Table A'),
        createdAt: now,
        updatedAt: now
      },

      // Sweetheart Table
      {
        seatNumber: 1,
        guestName: 'Taylor Smith',
        assigned: true,
        guestId: getGuestId('Taylor Smith'),
        tableId: getTableId('Sweetheart Table'),
        createdAt: now,
        updatedAt: now
      },

      // Table B
      {
        seatNumber: 1,
        assigned: false,
        tableId: getTableId('Table B'),
        createdAt: now,
        updatedAt: now
      },
      {
        seatNumber: 2,
        guestName: 'Morgan Lee',
        assigned: true,
        guestId: getGuestId('Morgan Lee'),
        tableId: getTableId('Table B'),
        createdAt: now,
        updatedAt: now
      }
    ].filter(seat => seat.tableId); // Only insert if linked to a valid table

    return queryInterface.bulkInsert('Seats', seats, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Seats';
    return queryInterface.bulkDelete(options, null, {});
  }
};