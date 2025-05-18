'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const Events = await queryInterface.sequelize.query(
      `SELECT id, title FROM "Events"`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    console.log('Fetched events:', Events);

    const getEventId = (title) => {
      const match = Events.find(e => e.title === title);
      if (!match) console.warn(`Event not found: "${title}"`);
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
    ].filter(mb => mb.eventId);

    if (!moodboards.length) {
      console.warn('No MoodBoards to insert. Skipping...');
      return;
    }

    console.log('Resolved MoodBoards:', moodboards.map(mb => ({ name: mb.name, eventId: mb.eventId })));

    return queryInterface.bulkInsert('MoodBoards', moodboards, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'MoodBoards';
    return queryInterface.bulkDelete(options, null, {});
  }
};