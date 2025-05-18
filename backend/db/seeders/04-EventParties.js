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
    const Vendors = await queryInterface.sequelize.query(
      `SELECT id, name FROM "Vendors"`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const getEventId = (title) => {
      const match = Events.find(e => e.title === title);
      if (!match) console.warn(`Event not found: "${title}"`);
      return match?.id || null;
    };

    const getVendorId = (name) => {
      const match = Vendors.find(v => v.name === name);
      if (!match) console.warn(`Vendor not found: "${name}"`);
      return match?.id || null;
    };

    const rawData = [
      {
        name: 'Miller-Johnson Lead Planner',
        role: 'Lead Planner',
        responsibilities: 'Overall coordination, vendor management, timeline creation',
        notes: 'Primary point of contact for all vendors',
        eventTitle: 'Miller-Johnson Wedding Ceremony',
        vendorName: 'LK Events'
      },
      {
        name: 'Miller-Johnson Ceremony Designer',
        role: 'Design Lead',
        responsibilities: 'Ceremony decor, floral installations, aisle design',
        notes: 'Working with bride on custom arch design',
        eventTitle: 'Miller-Johnson Wedding Reception',
        vendorName: 'HMR Designs'
      },
      {
        name: 'Wilson Corporate Gala AV',
        role: 'AV Lead',
        responsibilities: 'Audio/visual setup, lighting design',
        notes: 'Handles keynote stage and lighting',
        eventTitle: 'Wilson Corporate Gala',
        vendorName: 'Fig Catering' // Or replace with actual AV vendor if exists
      },
      {
        name: 'Clark Anniversary Florist',
        role: 'Florist',
        responsibilities: 'Floral arrangements and entryway decor',
        notes: 'Focus on seasonal blooms and centerpiece color harmony',
        eventTitle: 'Clark Anniversary Celebration',
        vendorName: 'HMR Designs'
      }
    ];

    const eventParties = rawData.map(item => ({
      name: item.name,
      role: item.role,
      responsibilities: item.responsibilities,
      notes: item.notes,
      EventId: getEventId(item.eventTitle),
      VendorId: getVendorId(item.vendorName),
      createdAt: now,
      updatedAt: now
    })).filter(entry => {
      if (!entry.EventId || !entry.VendorId) {
        console.warn(`Skipping "${entry.name}" due to missing foreign keys.`);
        return false;
      }
      return true;
    });

    if (eventParties.length > 0) {
      await queryInterface.bulkInsert('EventParties', eventParties, options);
    } else {
      console.warn('No EventParties inserted due to FK mismatches.');
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'EventParties';
    return queryInterface.bulkDelete(options, null, {});
  }
};