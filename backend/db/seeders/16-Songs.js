'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // Fetch reference data
    const [events, users] = await Promise.all([
      queryInterface.sequelize.query(
        `SELECT id, title FROM "Events"`,
        { type: Sequelize.QueryTypes.SELECT }
      ),
      queryInterface.sequelize.query(
        `SELECT id, email FROM "Users"`,
        { type: Sequelize.QueryTypes.SELECT }
      )
    ]);

    const getEventId = (title) => {
      const event = events.find(e => e.title === title);
      if (!event) console.warn(`Event not found: "${title}"`);
      return event?.id || null;
    };

    const getUserId = (email) => {
      const user = users.find(u => u.email === email);
      if (!user) console.warn(`User not found: "${email}"`);
      return user?.id || null;
    };

    // Raw song data
    const rawSongs = [
      {
        title: 'Perfect',
        artist: 'Ed Sheeran',
        requestedByName: 'Emily Johnson',
        requestType: 'slow-dance',
        approved: true,
        notes: 'For the first dance',
        eventTitle: 'Miller-Johnson Wedding Ceremony',
        requestedByEmail: 'maid@example.com'
      },
      {
        title: 'Can’t Stop the Feeling!',
        artist: 'Justin Timberlake',
        requestedByName: 'Mike Thompson',
        requestType: 'dance-floor',
        approved: true,
        notes: '',
        eventTitle: 'Miller-Johnson Wedding Reception',
        requestedByEmail: 'bestman@example.com'
      }
    ];

    const songs = rawSongs
      .map(song => ({
        title: song.title,
        artist: song.artist,
        requestedByName: song.requestedByName,
        requestType: song.requestType || 'general',
        approved: song.approved ?? true,
        notes: song.notes || '',
        eventId: getEventId(song.eventTitle),
        requestedById: getUserId(song.requestedByEmail),
        createdAt: now,
        updatedAt: now
      }))
      .filter(song => {
        const isValid = song.title && song.artist && song.eventId;
        if (!isValid) {
          console.warn(`Skipping invalid song entry:`, song);
        }
        return isValid;
      });

    console.log('Inserting songs:', songs);

    if (songs.length === 0) {
      console.warn('No valid songs to insert. Skipping...');
      return;
    }

    await queryInterface.bulkInsert('Songs', songs, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Songs';
    return queryInterface.bulkDelete(options, null, {});
  }
};