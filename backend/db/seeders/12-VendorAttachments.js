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
      `SELECT id, name FROM capstone_schema."Vendors"`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    console.log('Resolved Vendors:', Vendors);

    const getVendorId = (name) => {
      const vendor = Vendors.find(v => v.name === name);
      if (!vendor) console.warn(`Vendor not found: "${name}"`);
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
    ].filter(a => a.vendorId); // Only insert if vendorId was resolved

    if (attachments.length === 0) {
      console.warn('No VendorAttachments to insert. Skipping...');
      return;
    }

    console.log('Inserting VendorAttachments:', attachments.map(a => ({
      name: a.name,
      vendorId: a.vendorId
    })));

    return queryInterface.bulkInsert({tableName: "VendorAttachments", schema: "capstone_schema"}, attachments, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'VendorAttachments';
    return queryInterface.bulkDelete(options, null, {});
  }
};