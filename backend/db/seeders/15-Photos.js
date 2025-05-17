// 'use strict';

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA;
// }
// options.tableName = 'Photos';

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     const now = new Date();

//     // Fetch related Users and Events
//     const Users = await queryInterface.sequelize.query(
//       `SELECT id, email FROM "Users";`,
//       { type: Sequelize.QueryTypes.SELECT }
//     );
//     const Events = await queryInterface.sequelize.query(
//       `SELECT id, title FROM "Events";`,
//       { type: Sequelize.QueryTypes.SELECT }
//     );

//     const getUserId = (email) => {
//       const user = Users.find(u => u.email === email);
//       if (!user) console.warn(`User not found: ${email}`);
//       return user?.id || null;
//     };

//     const getEventId = (title) => {
//       const event = Events.find(e => e.title === title);
//       if (!event) console.warn(`Event not found: ${title}`);
//       return event?.id || null;
//     };

//     const rawPhotos = [
//       {
//         title: 'Ceremony Arch Close-up',
//         description: 'Close-up of the floral arch at the ceremony site.',
//         imageUrl: 'https://example.com/images/ceremony-arch.jpg',
//         thumbnailUrl: 'https://example.com/images/thumbs/ceremony-arch.jpg',
//         tags: ['ceremony', 'flowers', 'arch'],
//         uploadedBy: 'emily.rivera@example.com',
//         eventTitle: 'Miller-Johnson Wedding Ceremony'
//       },
//       {
//         title: 'Reception Setup',
//         description: 'Wide shot of reception layout with lighting setup.',
//         imageUrl: 'https://example.com/images/reception-layout.jpg',
//         thumbnailUrl: 'https://example.com/images/thumbs/reception-layout.jpg',
//         tags: ['reception', 'layout', 'lighting'],
//         uploadedBy: 'sophia.kim@example.com',
//         eventTitle: 'Miller-Johnson Wedding Reception'
//       },
//       {
//         title: 'Corporate Gala Stage',
//         description: 'Stage setup with company branding.',
//         imageUrl: 'https://example.com/images/gala-stage.jpg',
//         thumbnailUrl: 'https://example.com/images/thumbs/gala-stage.jpg',
//         tags: ['corporate', 'stage', 'branding'],
//         uploadedBy: 'sophia.kim@example.com',
//         eventTitle: 'Wilson Corporate Gala'
//       }
//     ];

//     const photos = rawPhotos.map(p => ({
//       title: p.title,
//       description: p.description,
//       imageUrl: p.imageUrl,
//       thumbnailUrl: p.thumbnailUrl,
//       tags: JSON.stringify(p.tags),
//       uploadedById: getUserId(p.uploadedBy),
//       EventId: getEventId(p.eventTitle),
//       createdAt: now,
//       updatedAt: now
//     })).filter(p => p.uploadedById && p.EventId);

//     if (!photos.length) {
//       console.warn('No valid photos to insert. Skipping...');
//       return;
//     }

//     console.log('Inserting photos:', photos.map(p => ({
//       title: p.title,
//       uploadedById: p.uploadedById,
//       EventId: p.EventId
//     })));

//     return queryInterface.bulkInsert(options.tableName, photos, options);
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

    // Fetch Users and Events
    const Users = await queryInterface.sequelize.query(
      `SELECT id, email FROM "Users"`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const Events = await queryInterface.sequelize.query(
      `SELECT id, title FROM "Events"`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const getUserId = (email) => {
      const user = Users.find(u => u.email === email);
      return user ? user.id : null;
    };

    const getEventId = (title) => {
      const event = Events.find(e => e.title === title);
      return event ? event.id : null;
    };

    const photos = [
      {
        title: 'Ceremony Arch Close-up',
        description: 'Close-up of the floral arch at the ceremony site.',
        imageUrl: 'https://example.com/images/ceremony-arch.jpg',
        thumbnailUrl: 'https://example.com/images/thumbs/ceremony-arch.jpg',
        tags: JSON.stringify(['ceremony', 'flowers', 'arch']),
        uploadedById: getUserId('emily.rivera@example.com'),
        EventId: getEventId('Miller-Johnson Wedding Ceremony'),
        createdAt: now,
        updatedAt: now
      },
      {
        title: 'Reception Setup',
        description: 'Wide shot of reception layout with lighting setup.',
        imageUrl: 'https://example.com/images/reception-layout.jpg',
        thumbnailUrl: 'https://example.com/images/thumbs/reception-layout.jpg',
        tags: JSON.stringify(['reception', 'layout', 'lighting']),
        uploadedById: getUserId('sophia.kim@example.com'),
        EventId: getEventId('Miller-Johnson Wedding Reception'),
        createdAt: now,
        updatedAt: now
      },
      {
        title: 'Corporate Gala Stage',
        description: 'Stage setup with company branding.',
        imageUrl: 'https://example.com/images/gala-stage.jpg',
        thumbnailUrl: 'https://example.com/images/thumbs/gala-stage.jpg',
        tags: JSON.stringify(['corporate', 'stage', 'branding']),
        uploadedById: getUserId('sophia.kim@example.com'),
        EventId: getEventId('Wilson Corporate Gala'),
        createdAt: now,
        updatedAt: now
      }
    ].filter(p => p.uploadedById && p.EventId);

    console.log('Inserting photos:', photos);

    if (photos.length > 0) {
      return queryInterface.bulkInsert('Photos', photos, options);
    } else {
      console.warn('No valid photos to insert.');
      return;
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Photos';
    return queryInterface.bulkDelete(options, null, {});
  }
};