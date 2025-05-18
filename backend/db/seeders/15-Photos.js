'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
const schema = options.schema ? `"${options.schema}".` : '';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // Fetch Users and Events
    const Users = await queryInterface.sequelize.query(
      `SELECT id, email FROM ${schema}"Users"`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const Events = await queryInterface.sequelize.query(
      `SELECT id, title FROM ${schema}"Events"`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const getUserId = (email) => {
      const user = Users.find(u => u.email === email);
      if (!user) console.warn(`User not found: "${email}"`);
      return user ? user.id : null;
    };

    const getEventId = (title) => {
      const event = Events.find(e => e.title === title);
      if (!event) console.warn(`Event not found: "${title}"`);
      return event ? event.id : null;
    };

    let photos = [
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
    ];

    photos = photos.filter(p => p.uploadedById && p.EventId);

    if (!photos.length) {
      console.warn('No valid photos to insert. Skipping...');
      return;
    }

    console.log('Resolved Photos:', photos.map(p => ({
      title: p.title,
      uploadedById: p.uploadedById,
      EventId: p.EventId
    })));

    return queryInterface.bulkInsert('Photos', photos, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Photos';
    return queryInterface.bulkDelete(options, null, {});
  }
};

// 'use strict';

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA;
// }

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     const now = new Date();

//     // Fetch Users and Events
//     const Users = await queryInterface.sequelize.query(
//       `SELECT id, email FROM "Users"`,
//       { type: Sequelize.QueryTypes.SELECT }
//     );
//     const Events = await queryInterface.sequelize.query(
//       `SELECT id, title FROM "Events"`,
//       { type: Sequelize.QueryTypes.SELECT }
//     );

//     const getUserId = (email) => {
//       const user = Users.find(u => u.email === email);
//       return user ? user.id : null;
//     };

//     const getEventId = (title) => {
//       const event = Events.find(e => e.title === title);
//       return event ? event.id : null;
//     };

//     const photos = [
//       {
//         title: 'Ceremony Arch Close-up',
//         description: 'Close-up of the floral arch at the ceremony site.',
//         imageUrl: 'https://example.com/images/ceremony-arch.jpg',
//         thumbnailUrl: 'https://example.com/images/thumbs/ceremony-arch.jpg',
//         tags: JSON.stringify(['ceremony', 'flowers', 'arch']),
//         uploadedById: getUserId('emily.rivera@example.com'),
//         EventId: getEventId('Miller-Johnson Wedding Ceremony'),
//         createdAt: now,
//         updatedAt: now
//       },
//       {
//         title: 'Reception Setup',
//         description: 'Wide shot of reception layout with lighting setup.',
//         imageUrl: 'https://example.com/images/reception-layout.jpg',
//         thumbnailUrl: 'https://example.com/images/thumbs/reception-layout.jpg',
//         tags: JSON.stringify(['reception', 'layout', 'lighting']),
//         uploadedById: getUserId('sophia.kim@example.com'),
//         EventId: getEventId('Miller-Johnson Wedding Reception'),
//         createdAt: now,
//         updatedAt: now
//       },
//       {
//         title: 'Corporate Gala Stage',
//         description: 'Stage setup with company branding.',
//         imageUrl: 'https://example.com/images/gala-stage.jpg',
//         thumbnailUrl: 'https://example.com/images/thumbs/gala-stage.jpg',
//         tags: JSON.stringify(['corporate', 'stage', 'branding']),
//         uploadedById: getUserId('sophia.kim@example.com'),
//         EventId: getEventId('Wilson Corporate Gala'),
//         createdAt: now,
//         updatedAt: now
//       }
//     ].filter(p => p.uploadedById && p.EventId);

//     console.log('Inserting photos:', photos);

//     if (photos.length > 0) {
//       return queryInterface.bulkInsert('Photos', photos, options);
//     } else {
//       console.warn('No valid photos to insert.');
//       return;
//     }
//   },

//   async down(queryInterface, Sequelize) {
//     options.tableName = 'Photos';
//     return queryInterface.bulkDelete(options, null, {});
//   }
// };