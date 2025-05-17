// 'use strict';

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA;
// }
// options.tableName = 'VendorAttachments';

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     const now = new Date();

//     // Fetch Vendor IDs by name
//     const vendors = await queryInterface.sequelize.query(
//       `SELECT id, name FROM "Vendors";`,
//       { type: Sequelize.QueryTypes.SELECT }
//     );

//     const getVendorId = (name) => {
//       const match = vendors.find(v => v.name === name);
//       if (!match) console.warn(`Vendor not found: "${name}"`);
//       return match?.id || null;
//     };

//     const rawAttachments = [
//       {
//         name: 'Planning Contract - LK Events',
//         fileUrl: 'https://example.com/contracts/lkevents-contract.pdf',
//         type: 'contract',
//         vendorName: 'LK Events'
//       },
//       {
//         name: 'Design Mockup - HMR',
//         fileUrl: 'https://example.com/designs/hmr-mockup.pdf',
//         type: 'mockup',
//         vendorName: 'HMR Designs'
//       },
//       {
//         name: 'Menu Package - Fig Catering',
//         fileUrl: 'https://example.com/menus/fig-catering-menu.pdf',
//         type: 'menu',
//         vendorName: 'Fig Catering'
//       }
//     ];

//     const attachments = rawAttachments.map(a => ({
//       name: a.name,
//       fileUrl: a.fileUrl,
//       type: a.type,
//       vendorId: getVendorId(a.vendorName),
//       createdAt: now,
//       updatedAt: now
//     })).filter(a => a.vendorId);

//     if (!attachments.length) {
//       console.warn('No valid attachments to insert.');
//       return;
//     }

//     console.log('Inserting attachments:', attachments.map(a => ({
//       name: a.name,
//       vendorId: a.vendorId
//     })));

//     return queryInterface.bulkInsert(options.tableName, attachments, options);
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

    // Fetch Vendor IDs by name
    const Vendors = await queryInterface.sequelize.query(
      `SELECT id, name FROM "Vendors"`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const getVendorId = (name) => {
      const vendor = Vendors.find(v => v.name === name);
      return vendor ? vendor.id : null;
    };

    const attachments = [
      {
        name: 'Planning Contract - LK Events',
        fileUrl: 'https://example.com/contracts/lkevents-contract.pdf',
        type: 'contract',
        vendorId: getVendorId('LK Events'),
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Design Mockup - HMR',
        fileUrl: 'https://example.com/designs/hmr-mockup.pdf',
        type: 'mockup',
        vendorId: getVendorId('HMR Designs'),
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Menu Package - Fig Catering',
        fileUrl: 'https://example.com/menus/fig-catering-menu.pdf',
        type: 'menu',
        vendorId: getVendorId('Fig Catering'),
        createdAt: now,
        updatedAt: now
      }
    ].filter(a => a.vendorId); // Ensure vendor exists

    return queryInterface.bulkInsert('VendorAttachments', attachments, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'VendorAttachments';
    return queryInterface.bulkDelete(options, null, {});
  }
};