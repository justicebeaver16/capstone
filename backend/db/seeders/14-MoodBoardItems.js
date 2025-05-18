'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
const schema = options.schema ? `"${options.schema}".` : '';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // Fetch MoodBoards
    const MoodBoards = await queryInterface.sequelize.query(
      `SELECT id, name FROM capstone_schema."MoodBoards"`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Helper function
    const getMoodBoardId = (name) => {
      const board = MoodBoards.find(mb => mb.name === name);
      if (!board) console.warn(`MoodBoard not found: "${name}"`);
      return board ? board.id : null;
    };

    // Raw mood board items
    let moodBoardItems = [
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
        moodBoardId: getMoodBoardId('Ceremony Inspiration'),
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
        moodBoardId: getMoodBoardId('Reception Decor Board'),
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
        moodBoardId: getMoodBoardId('Gala Mood Board'),
        createdAt: now,
        updatedAt: now
      }
    ];

    // Filter out invalid entries
    moodBoardItems = moodBoardItems.filter(item => item.moodBoardId);

    if (!moodBoardItems.length) {
      console.warn('No MoodBoardItems to insert. Skipping...');
      return;
    }

    console.log('Resolved MoodBoardItems:', moodBoardItems.map(i => ({
      type: i.type,
      moodBoardId: i.moodBoardId
    })));

    return queryInterface.bulkInsert({tableName: "MoodBoardItems", schema: "capstone_schema"}, moodBoardItems, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'MoodBoardItems';
    return queryInterface.bulkDelete(options, null, {});
  }
};