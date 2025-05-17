// 'use strict';

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA;
// }
// options.tableName = 'Vendors';

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     const now = new Date();

//     const events = await queryInterface.sequelize.query(
//       `SELECT id, title FROM "Events";`,
//       { type: Sequelize.QueryTypes.SELECT }
//     );

//     const getEventId = (title) => {
//       const match = events.find(e => e.title === title);
//       return match ? match.id : null;
//     };

//     const vendors = [
//       {
//         name: 'LK Events',
//         category: 'Event Planning',
//         contactName: 'Lori K.',
//         contactEmail: 'lori@lkevents.com',
//         contactPhone: '312-555-0101',
//         website: 'https://lkevents.com',
//         address: '123 Michigan Ave',
//         city: 'Chicago',
//         state: 'IL',
//         zipCode: '60601',
//         latitude: 41.886,
//         longitude: -87.624,
//         priceAmount: 12000,
//         priceCurrency: 'USD',
//         priceNote: 'Full-service planning package',
//         description: 'Luxury event planning and coordination',
//         notes: 'Handled multiple weddings for the Johnsons',
//         status: 'booked',
//         rating: 5,
//         tags: ['wedding', 'luxury', 'full-service'],
//         EventId: getEventId('Miller-Johnson Wedding Ceremony'),
//         createdAt: now,
//         updatedAt: now
//       },
//       {
//         name: 'HMR Designs',
//         category: 'Decor',
//         contactName: 'Jason O.',
//         contactEmail: 'jason@hmrdesigns.com',
//         contactPhone: '312-555-0202',
//         website: 'https://hmrdesigns.com',
//         address: '456 Design Blvd',
//         city: 'Chicago',
//         state: 'IL',
//         zipCode: '60654',
//         latitude: 41.895,
//         longitude: -87.638,
//         priceAmount: 8500,
//         priceCurrency: 'USD',
//         priceNote: 'Ceremony & reception decor',
//         description: 'Award-winning event design studio',
//         notes: 'Includes custom arch and table setups',
//         status: 'confirmed',
//         rating: 4,
//         tags: ['decor', 'floral', 'setup'],
//         EventId: getEventId('Miller-Johnson Wedding Reception'),
//         createdAt: now,
//         updatedAt: now
//       },
//       {
//         name: 'Fig Catering',
//         category: 'Catering',
//         contactName: 'Michelle B.',
//         contactEmail: 'michelle@figcatering.com',
//         contactPhone: '312-555-0303',
//         website: 'https://figcatering.com',
//         address: '789 Gourmet Rd',
//         city: 'Chicago',
//         state: 'IL',
//         zipCode: '60607',
//         latitude: 41.878,
//         longitude: -87.652,
//         priceAmount: 15000,
//         priceCurrency: 'USD',
//         priceNote: 'Farm-to-table plated dinner for 100 guests',
//         description: 'Sustainable, locally-sourced catering services',
//         notes: 'Vegetarian-friendly menu options',
//         status: 'paid',
//         rating: 5,
//         tags: ['organic', 'sustainable', 'plated'],
//         EventId: getEventId('Wilson Corporate Gala'),
//         createdAt: now,
//         updatedAt: now
//       }
//     ].filter(v => v.EventId);

//     if (!vendors.length) {
//       console.warn('No valid EventId matches found. Skipping vendor insertion.');
//       return;
//     }

//     return queryInterface.bulkInsert(options.tableName, vendors, options);
//   },

//   async down(queryInterface, Sequelize) {
//     return queryInterface.bulkDelete(options, null, options);
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

    const events = await queryInterface.sequelize.query(
      `SELECT id, title FROM "Events";`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const getEventId = (title) => {
      const event = events.find(e => e.title === title);
      return event ? event.id : null;
    };

    const vendors = [
      {
        name: 'LK Events',
        category: 'Event Planning',
        contactName: 'Lori K.',
        contactEmail: 'lori@lkevents.com',
        contactPhone: '312-555-0101',
        website: 'https://lkevents.com',
        address: '123 Michigan Ave',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        latitude: 41.886,
        longitude: -87.624,
        priceAmount: 12000,
        priceCurrency: 'USD',
        priceNote: 'Full-service planning package',
        description: 'Luxury event planning and coordination',
        notes: 'Handled multiple weddings for the Johnsons',
        status: 'booked',
        rating: 5,
        tags: JSON.stringify(['wedding', 'luxury', 'full-service']),
        EventId: getEventId('Miller-Johnson Wedding Ceremony'),
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'HMR Designs',
        category: 'Decor',
        contactName: 'Jason O.',
        contactEmail: 'jason@hmrdesigns.com',
        contactPhone: '312-555-0202',
        website: 'https://hmrdesigns.com',
        address: '456 Design Blvd',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60654',
        latitude: 41.895,
        longitude: -87.638,
        priceAmount: 8500,
        priceCurrency: 'USD',
        priceNote: 'Ceremony & reception decor',
        description: 'Award-winning event design studio',
        notes: 'Includes custom arch and table setups',
        status: 'confirmed',
        rating: 4,
        tags: JSON.stringify(['decor', 'floral', 'setup']),
        EventId: getEventId('Miller-Johnson Wedding Reception'),
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Fig Catering',
        category: 'Catering',
        contactName: 'Michelle B.',
        contactEmail: 'michelle@figcatering.com',
        contactPhone: '312-555-0303',
        website: 'https://figcatering.com',
        address: '789 Gourmet Rd',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60607',
        latitude: 41.878,
        longitude: -87.652,
        priceAmount: 15000,
        priceCurrency: 'USD',
        priceNote: 'Farm-to-table plated dinner for 100 guests',
        description: 'Sustainable, locally-sourced catering services',
        notes: 'Vegetarian-friendly menu options',
        status: 'paid',
        rating: 5,
        tags: JSON.stringify(['organic', 'sustainable', 'plated']),
        EventId: getEventId('Wilson Corporate Gala'),
        createdAt: now,
        updatedAt: now
      }
    ].filter(v => v.EventId);

    console.log('Resolved vendors:', vendors.map(v => ({ name: v.name, EventId: v.EventId })));

    if (vendors.length === 0) {
      console.warn('No vendors to insert. Skipping...');
      return;
    }

    return queryInterface.bulkInsert('Vendors', vendors, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Vendors';
    return queryInterface.bulkDelete(options, null, {});
  }
};