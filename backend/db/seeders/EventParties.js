'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    
    // Event party roles for wedding/event planning team
    const eventParties = [
      // Miller-Johnson Wedding
      {
        EventId: 1, // Miller-Johnson Wedding Ceremony
        VendorId: 9, // LK Events (Event Planning)
        role: 'Lead Planner',
        responsibilities: 'Overall coordination, vendor management, timeline creation',
        notes: 'Primary point of contact for all vendors',
        createdAt: now,
        updatedAt: now
      },
      {
        EventId: 1, // Miller-Johnson Wedding Ceremony
        VendorId: 5, // HMR Designs (Decor)
        role: 'Design Lead',
        responsibilities: 'Ceremony decor, floral installations, aisle design',
        notes: 'Working with bride on custom arch design',
        createdAt: now,
        updatedAt: now
      },
      {
        EventId: 1, // Miller-Johnson Wedding Ceremony
        VendorId: 7, // Fleur Inc (Florist)
        role: 'Floral Designer',
        responsibilities: 'Bridal bouquet, bridesmaids bouquets, boutonnieres, corsages',
        notes: 'Using locally-sourced blooms in blush and ivory palette',
        createdAt: now,
        updatedAt: now
      },
      {
        EventId: 1, // Miller-Johnson Wedding Ceremony
        VendorId: 2, // George Street Photo & Video
        role: 'Lead Photographer',
        responsibilities: 'Ceremony photography, wedding party photos',
        notes: 'Capturing both candid and formal portraits',
        createdAt: now,
        updatedAt: now
      },

      // Miller-Johnson Wedding Reception
      {
        EventId: 2, // Miller-Johnson Wedding Reception
        VendorId: 9, // LK Events
        role: 'Lead Planner',
        responsibilities: 'Reception coordination, grand entrance, speech timing',
        notes: 'Managing vendor transitions from ceremony to reception',
        createdAt: now,
        updatedAt: now
      },
      {
        EventId: 2, // Miller-Johnson Wedding Reception
        VendorId: 1, // Blue Plate Catering
        role: 'Catering Director',
        responsibilities: 'Menu execution, staff management, service timing',
        notes: 'Overseeing custom farm-to-table menu service',
        createdAt: now,
        updatedAt: now
      },
      {
        EventId: 2, // Miller-Johnson Wedding Reception
        VendorId: 4, // Toast & Jam DJs
        role: 'Reception DJ',
        responsibilities: 'Music curation, announcements, timeline management',
        notes: 'Coordinating first dance and parent dances',
        createdAt: now,
        updatedAt: now
      },
      {
        EventId: 2, // Miller-Johnson Wedding Reception
        VendorId: 8, // West Town Bakery
        role: 'Pastry Chef',
        responsibilities: 'Wedding cake, dessert display, cake cutting coordination',
        notes: 'Four-tier cake with custom flavor for each tier',
        createdAt: now,
        updatedAt: now
      },

      // Clark Anniversary Celebration
      {
        EventId: 5, // Clark Anniversary Celebration
        VendorId: 9, // LK Events
        role: 'Event Coordinator',
        responsibilities: 'Overall event management, timeline development',
        notes: 'Working closely with couple on surprise elements',
        createdAt: now,
        updatedAt: now
      },
      {
        EventId: 5, // Clark Anniversary Celebration
        VendorId: 5, // HMR Designs
        role: 'Design Director',
        responsibilities: 'Anniversary decor design, table settings, lighting design',
        notes: 'Recreating elements from original wedding with modern touches',
        createdAt: now,
        updatedAt: now
      },

      // Wilson Corporate Gala
      {
        EventId: 6, // Wilson Corporate Gala
        VendorId: 9, // LK Events
        role: 'Lead Planner',
        responsibilities: 'Overall coordination, client communications, vendor management',
        notes: 'Fourth year working with this client on annual gala',
        createdAt: now,
        updatedAt: now
      },
      {
        EventId: 6, // Wilson Corporate Gala
        VendorId: 10, // AVFX Chicago
        role: 'Technical Director',
        responsibilities: 'Audio/visual setup, presentations, lighting design',
        notes: 'Managing complex AV requirements for keynote speaker',
        createdAt: now,
        updatedAt: now
      },
      {
        EventId: 6, // Wilson Corporate Gala
        VendorId: 13, // Fig Catering
        role: 'Catering Manager',
        responsibilities: 'Custom menu development, service staff coordination',
        notes: 'Implementing sustainable practices for zero-waste event',
        createdAt: now,
        updatedAt: now
      },
      {
        EventId: 6, // Wilson Corporate Gala
        VendorId: 11, // Monterrey Security
        role: 'Security Manager',
        responsibilities: 'Event security, guest check-in, VIP protocol',
        notes: 'Coordinating with venue on security procedures',
        createdAt: now,
        updatedAt: now
      },

      // Thompson-Garcia Engagement Party
      {
        EventId: 4, // Thompson-Garcia Engagement Party
        VendorId: 9, // LK Events
        role: 'Event Designer',
        responsibilities: 'Theme development, decor coordination, timeline management',
        notes: 'Creating relaxed but elegant atmosphere',
        createdAt: now,
        updatedAt: now
      },
      {
        EventId: 4, // Thompson-Garcia Engagement Party
        VendorId: 8, // West Town Bakery
        role: 'Dessert Coordinator',
        responsibilities: 'Custom dessert table, engagement cake, themed cookies',
        notes: 'Incorporating couple\'s favorite flavors and colors',
        createdAt: now,
        updatedAt: now
      },

      // Bridal Shower
      {
        EventId: 10, // Taylor Bridal Shower
        VendorId: 13, // Fig Catering
        role: 'Catering Coordinator',
        responsibilities: 'Tea service, food display, service coordination',
        notes: 'Creating elegant tea party atmosphere with custom menu',
        createdAt: now,
        updatedAt: now
      },
      {
        EventId: 10, // Taylor Bridal Shower
        VendorId: 7, // Fleur Inc
        role: 'Floral Designer',
        responsibilities: 'Centerpieces, entry arrangement, favor design',
        notes: 'Garden-inspired arrangements with seasonal blooms',
        createdAt: now,
        updatedAt: now
      }
    ];

    // Insert all event parties into the EventParties table
    return queryInterface.bulkInsert('EventParties', eventParties, {});
  },

  async down(queryInterface, Sequelize) {
    // Remove all entries when rolling back the seeder
    return queryInterface.bulkDelete('EventParties', null, {});
  }
};