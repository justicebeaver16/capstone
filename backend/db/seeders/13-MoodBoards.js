// 'use strict';

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA;
// }
// options.tableName = 'MoodBoards';

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     const now = new Date();

//     // Fetch Event IDs
//     const events = await queryInterface.sequelize.query(
//       `SELECT id, title FROM "Events";`,
//       { type: Sequelize.QueryTypes.SELECT }
//     );

//     const getEventId = (title) => {
//       const match = events.find(e => e.title === title);
//       if (!match) console.warn(`Event not found: "${title}"`);
//       return match?.id || null;
//     };

//     const rawBoards = [
//       {
//         name: 'Ceremony Inspiration',
//         description: 'Floral arrangements, color palette, and altar design ideas.',
//         eventTitle: 'Miller-Johnson Wedding Ceremony'
//       },
//       {
//         name: 'Reception Decor Board',
//         description: 'Table settings, lighting, and stage concepts.',
//         eventTitle: 'Miller-Johnson Wedding Reception'
//       },
//       {
//         name: 'Gala Mood Board',
//         description: 'Corporate theme design and branding references.',
//         eventTitle: 'Wilson Corporate Gala'
//       }
//     ];

//     const moodboards = rawBoards.map(b => ({
//       name: b.name,
//       description: b.description,
//       eventId: getEventId(b.eventTitle),
//       createdAt: now,
//       updatedAt: now
//     })).filter(b => b.eventId);

//     if (!moodboards.length) {
//       console.warn('No valid moodboards to insert.');
//       return;
//     }

//     console.log('Inserting moodboards:', moodboards.map(b => ({
//       name: b.name,
//       eventId: b.eventId
//     })));

//     return queryInterface.bulkInsert(options.tableName, moodboards, options);
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

    // Fetch Event IDs by title
    const Events = await queryInterface.sequelize.query(
      `SELECT id, title FROM "Events"`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const getEventId = (title) => {
      const match = Events.find(e => e.title === title);
      return match ? match.id : null;
    };

    const moodboards = [
      {
        name: 'Ceremony Inspiration',
        description: 'Floral arrangements, color palette, and altar design ideas.',
        eventId: getEventId('Miller-Johnson Wedding Ceremony'),
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Reception Decor Board',
        description: 'Table settings, lighting, and stage concepts.',
        eventId: getEventId('Miller-Johnson Wedding Reception'),
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Gala Mood Board',
        description: 'Corporate theme design and branding references.',
        eventId: getEventId('Wilson Corporate Gala'),
        createdAt: now,
        updatedAt: now
      }
    ].filter(mb => mb.eventId); // Avoid inserting orphaned moodboards

    return queryInterface.bulkInsert('MoodBoards', moodboards, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'MoodBoards';
    return queryInterface.bulkDelete(options, null, {});
  }
};