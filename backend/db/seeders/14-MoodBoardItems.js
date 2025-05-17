// 'use strict';

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA;
// }
// options.tableName = 'MoodBoardItems';

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     const now = new Date();

//     // Fetch existing mood boards
//     const moodBoards = await queryInterface.sequelize.query(
//       `SELECT id, name FROM "MoodBoards";`,
//       { type: Sequelize.QueryTypes.SELECT }
//     );

//     const getMoodBoardId = (name) => {
//       const board = moodBoards.find(mb => mb.name === name);
//       if (!board) console.warn(`MoodBoard not found: "${name}"`);
//       return board?.id || null;
//     };

//     const rawItems = [
//       {
//         type: 'image',
//         content: 'https://example.com/images/floral-arch.jpg',
//         description: 'Floral arch inspiration for the altar',
//         source: 'Pinterest',
//         tags: ['ceremony', 'flowers', 'arch'],
//         positionX: 50,
//         positionY: 100,
//         width: 300,
//         height: 250,
//         moodBoardName: 'Ceremony Inspiration'
//       },
//       {
//         type: 'note',
//         content: 'Use soft lighting and blush tones for an evening vibe.',
//         description: 'Lighting notes',
//         source: null,
//         tags: ['lighting', 'ambience'],
//         positionX: 0,
//         positionY: 0,
//         width: 200,
//         height: 150,
//         moodBoardName: 'Reception Decor Board'
//       },
//       {
//         type: 'link',
//         content: 'https://eventbranding.com/corporate-theme-inspo',
//         description: 'Branding reference for stage setup',
//         source: 'eventbranding.com',
//         tags: ['stage', 'branding', 'corporate'],
//         positionX: 120,
//         positionY: 80,
//         width: 400,
//         height: 150,
//         moodBoardName: 'Gala Mood Board'
//       }
//     ];

//     const moodBoardItems = rawItems.map(item => ({
//       type: item.type,
//       content: item.content,
//       description: item.description,
//       source: item.source,
//       tags: JSON.stringify(item.tags),
//       positionX: item.positionX,
//       positionY: item.positionY,
//       width: item.width,
//       height: item.height,
//       MoodBoardId: getMoodBoardId(item.moodBoardName),
//       createdAt: now,
//       updatedAt: now
//     })).filter(item => item.MoodBoardId);

//     if (!moodBoardItems.length) {
//       console.warn('No MoodBoardItems to insert. Skipping...');
//       return;
//     }

//     console.log('Inserting MoodBoardItems:', moodBoardItems.map(i => ({
//       type: i.type,
//       MoodBoardId: i.MoodBoardId
//     })));

//     return queryInterface.bulkInsert(options.tableName, moodBoardItems, options);
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

    const MoodBoards = await queryInterface.sequelize.query(
      `SELECT id, name FROM "MoodBoards"`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const getMoodBoardId = (name) => {
      const board = MoodBoards.find(mb => mb.name === name);
      return board ? board.id : null;
    };

    const moodBoardItems = [
      {
        type: 'image',
        content: 'https://example.com/images/floral-arch.jpg',
        description: 'Floral arch inspiration for the altar',
        source: 'Pinterest',
        tags: JSON.stringify(['ceremony', 'flowers', 'arch']),
        positionX: 50,
        positionY: 100,
        width: 300,
        height: 250,
        MoodBoardId: getMoodBoardId('Ceremony Inspiration'),
        createdAt: now,
        updatedAt: now
      },
      {
        type: 'note',
        content: 'Use soft lighting and blush tones for an evening vibe.',
        description: 'Lighting notes',
        source: null,
        tags: JSON.stringify(['lighting', 'ambience']),
        positionX: 0,
        positionY: 0,
        width: 200,
        height: 150,
        MoodBoardId: getMoodBoardId('Reception Decor Board'),
        createdAt: now,
        updatedAt: now
      },
      {
        type: 'link',
        content: 'https://eventbranding.com/corporate-theme-inspo',
        description: 'Branding reference for stage setup',
        source: 'eventbranding.com',
        tags: JSON.stringify(['stage', 'branding', 'corporate']),
        positionX: 120,
        positionY: 80,
        width: 400,
        height: 150,
        MoodBoardId: getMoodBoardId('Gala Mood Board'),
        createdAt: now,
        updatedAt: now
      }
    ].filter(item => item.MoodBoardId); // Filter out any that are missing FKs

    return queryInterface.bulkInsert('MoodBoardItems', moodBoardItems, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'MoodBoardItems';
    return queryInterface.bulkDelete(options, null, {});
  }
};