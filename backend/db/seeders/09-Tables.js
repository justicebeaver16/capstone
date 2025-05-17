// 'use strict';

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA;
// }
// options.tableName = 'Tables';

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     const now = new Date();

//     // Fetch event ID for the reception (or default to first event if not found)
//     const [events] = await queryInterface.sequelize.query(
//       `SELECT id, title FROM "Events" ORDER BY "createdAt" ASC;`
//     );

//     const getEventId = (title) => {
//       const match = events.find(e => e.title === title);
//       if (!match) console.warn(`Event not found: "${title}"`);
//       return match?.id || events[0]?.id || null;
//     };

//     const eventId = getEventId('Miller-Johnson Wedding Reception');

//     if (!eventId) {
//       console.warn('No valid EventId found. Aborting table seeding.');
//       return;
//     }

//     const tables = [
//       {
//         name: 'Table A',
//         capacity: 8,
//         tableType: 'round',
//         positionX: 100,
//         positionY: 200,
//         EventId: eventId,
//         createdAt: now,
//         updatedAt: now
//       },
//       {
//         name: 'Table B',
//         capacity: 10,
//         tableType: 'rectangular',
//         positionX: 300,
//         positionY: 200,
//         EventId: eventId,
//         createdAt: now,
//         updatedAt: now
//       },
//       {
//         name: 'Sweetheart Table',
//         capacity: 2,
//         tableType: 'custom',
//         positionX: 500,
//         positionY: 100,
//         EventId: eventId,
//         createdAt: now,
//         updatedAt: now
//       },
//       {
//         name: 'Family Table',
//         capacity: 12,
//         tableType: 'rectangular',
//         positionX: 100,
//         positionY: 400,
//         EventId: eventId,
//         createdAt: now,
//         updatedAt: now
//       }
//     ];

//     console.log(`Inserting ${tables.length} tables for EventId ${eventId}`);
//     return queryInterface.bulkInsert(options.tableName, tables, options);
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

    const tables = [
      {
        name: 'Table A',
        capacity: 8,
        tableType: 'round',
        positionX: 100,
        positionY: 200,
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Table B',
        capacity: 10,
        tableType: 'rectangular',
        positionX: 300,
        positionY: 200,
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Sweetheart Table',
        capacity: 2,
        tableType: 'custom',
        positionX: 500,
        positionY: 100,
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Family Table',
        capacity: 12,
        tableType: 'rectangular',
        positionX: 100,
        positionY: 400,
        createdAt: now,
        updatedAt: now
      }
    ];

    return queryInterface.bulkInsert('Tables', tables, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Tables';
    return queryInterface.bulkDelete(options, null, {});
  }
};