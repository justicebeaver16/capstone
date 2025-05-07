'use strict';

const { Task } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tasks = [
      // Venue and Date Tasks
      {
        id: 1,
        title: 'Tour Chicago History Museum',
        description: 'Schedule and attend venue tour at Chicago History Museum. Need to see the Grand Ballroom, Garden Plaza, and check ceremony options.',
        dueDate: new Date('2025-06-15'),
        status: 'not-started',
        notes: 'Contact Emily at events@chicagohistory.org or (312) 799-2254. Ask about rain backup plan for outdoor ceremony.',
        createdAt: new Date('2025-05-23'),
        updatedAt: new Date('2025-05-23')
      },
      {
        id: 2,
        title: 'Visit The Langham Chicago',
        description: 'Schedule venue tour at The Langham Chicago. Need to see Ballroom and Riverside Room options.',
        dueDate: new Date('2025-06-10'),
        status: 'not-started',
        notes: 'Ask about hotel room block rates for guests and complimentary suite for wedding night.',
        createdAt: new Date('2025-05-24'),
        updatedAt: new Date('2025-05-24')
      },
      {
        id: 3,
        title: 'Confirm wedding date with family',
        description: 'Finalize wedding date choice with immediate family to ensure everyone can attend.',
        dueDate: new Date('2025-06-01'),
        status: 'in-progress',
        notes: 'Currently deciding between May 15, 2026 and June 5, 2026. Need to check with grandparents about travel arrangements.',
        createdAt: new Date('2025-05-25'),
        updatedAt: new Date('2025-05-28')
      },
      {
        id: 4,
        title: 'Sign venue contract',
        description: 'Review and sign contract with chosen venue after lawyer review.',
        dueDate: new Date('2025-07-15'),
        status: 'not-started',
        notes: 'Ensure all fees are disclosed, understand cancellation policy, and confirm vendor requirements.',
        createdAt: new Date('2025-05-27'),
        updatedAt: new Date('2025-05-27')
      },
      
      // Catering & Food Tasks
      {
        id: 5,
        title: 'Schedule tastings with Blue Plate Catering',
        description: 'Arrange menu tasting session with Blue Plate Catering to sample potential wedding menu options.',
        dueDate: new Date('2025-06-20'),
        status: 'not-started',
        notes: 'Need to sample entree options, appetizers, and discuss specialty cocktails. Remember to ask about dietary accommodations.',
        createdAt: new Date('2025-05-26'),
        updatedAt: new Date('2025-05-26')
      },
      {
        id: 6,
        title: 'Schedule tastings with Fig Catering',
        description: 'Set up alternative catering tasting with Fig Catering for comparison.',
        dueDate: new Date('2025-06-25'),
        status: 'not-started',
        notes: 'Heard great things about their seasonal menu options and farm-to-table approach.',
        createdAt: new Date('2025-05-26'),
        updatedAt: new Date('2025-05-26')
      },
      {
        id: 7,
        title: 'Book cake tasting at West Town Bakery',
        description: 'Schedule wedding cake tasting and consultation at West Town Bakery.',
        dueDate: new Date('2025-07-10'),
        status: 'not-started',
        notes: 'Looking for 3-tier semi-naked cake with fresh flower decorations. Bring design inspiration photos.',
        createdAt: new Date('2025-05-27'),
        updatedAt: new Date('2025-05-27')
      },
      
      // Photography & Entertainment Tasks
      {
        id: 8,
        title: 'Review George Street Photography portfolio',
        description: 'Look through sample galleries and full weddings from George Street Photography to evaluate style.',
        dueDate: new Date('2025-06-05'),
        status: 'in-progress',
        notes: 'Pay attention to low-light photos, candid moments, and overall editing style. Check if second shooter is included.',
        createdAt: new Date('2025-05-23'),
        updatedAt: new Date('2025-05-29')
      },
      {
        id: 9,
        title: 'Schedule meeting with Greenhouse Loft Photography',
        description: 'Set up consultation with Jessica from Greenhouse Loft Photography to discuss wedding coverage.',
        dueDate: new Date('2025-06-08'),
        status: 'not-started',
        notes: 'Ask about engagement session options, album packages, and availability for our potential dates.',
        createdAt: new Date('2025-05-25'),
        updatedAt: new Date('2025-05-25')
      },
      {
        id: 10,
        title: 'Listen to Toast & Jam DJ samples',
        description: 'Review music samples and approach from Toast & Jam DJs for ceremony and reception.',
        dueDate: new Date('2025-06-12'),
        status: 'not-started',
        notes: 'Need DJ who can handle both ceremony sound system and reception. Ask about microphones for vows and toasts.',
        createdAt: new Date('2025-05-27'),
        updatedAt: new Date('2025-05-27')
      },
      
      // Décor & Flowers Tasks
      {
        id: 11,
        title: 'Create wedding mood board',
        description: 'Develop Pinterest board with color scheme, floral inspiration, and overall aesthetic for vendors.',
        dueDate: new Date('2025-06-01'),
        status: 'in-progress',
        notes: 'Current palette is dusty blue, sage green, and white with gold accents. Going for romantic garden theme.',
        createdAt: new Date('2025-05-20'),
        updatedAt: new Date('2025-05-28')
      },
      {
        id: 12,
        title: 'Meet with Fleur Inc for floral consultation',
        description: 'Initial consultation with Fleur Inc to discuss ceremony and reception floral design.',
        dueDate: new Date('2025-07-05'),
        status: 'not-started',
        notes: 'Need quotes for: bridal bouquet, 4 bridesmaids bouquets, 6 boutonnieres, 2 corsages, ceremony arch, and 15 centerpieces.',
        createdAt: new Date('2025-05-27'),
        updatedAt: new Date('2025-05-27')
      },
      {
        id: 13,
        title: 'Research table linen options',
        description: 'Review linen rental options for reception tables that match color scheme.',
        dueDate: new Date('2025-07-15'),
        status: 'not-started',
        notes: 'Looking for floor-length tablecloths in ivory or white with dusty blue or sage napkins. Get samples if possible.',
        createdAt: new Date('2025-05-27'),
        updatedAt: new Date('2025-05-27')
      },
      {
        id: 14,
        title: 'Schedule meeting with HMR Designs',
        description: 'Set up consultation with HMR Designs for overall event décor and possible lighting options.',
        dueDate: new Date('2025-06-25'),
        status: 'not-started',
        notes: 'Interested in their full-service approach. Ask about ceremony backdrop, reception entrance, and statement pieces.',
        createdAt: new Date('2025-05-26'),
        updatedAt: new Date('2025-05-26')
      },
      
      // Guest Experience Tasks
      {
        id: 15,
        title: 'Research hotel blocks for out-of-town guests',
        description: 'Find and reserve room blocks at 2-3 hotels at different price points near venue.',
        dueDate: new Date('2025-07-30'),
        status: 'not-started',
        notes: 'Look into Marriott, Hilton, and boutique hotel options. Ask about transportation to/from venue.',
        createdAt: new Date('2025-05-27'),
        updatedAt: new Date('2025-05-27')
      },
      {
        id: 16,
        title: 'Research transportation options',
        description: 'Get quotes from Windy City Limousine for wedding party transportation and guest shuttle.',
        dueDate: new Date('2025-07-20'),
        status: 'not-started',
        notes: 'Need vintage car for couple, shuttle for wedding party, and guest transportation between ceremony, reception, and hotels.',
        createdAt: new Date('2025-05-25'),
        updatedAt: new Date('2025-05-25')
      },
      {
        id: 17,
        title: 'Start building guest list',
        description: 'Create preliminary guest list with addresses and contact information for save-the-dates.',
        dueDate: new Date('2025-06-20'),
        status: 'in-progress',
        notes: 'Current count is around 150 guests. Need to finalize A and B lists based on venue capacity.',
        createdAt: new Date('2025-05-18'),
        updatedAt: new Date('2025-05-27')
      },
      
      // Wedding Attire Tasks
      {
        id: 18,
        title: 'Research bridal salons',
        description: 'Make list of Chicago bridal salons to visit for wedding dress shopping.',
        dueDate: new Date('2025-06-05'),
        status: 'completed',
        notes: 'Appointments set at BHLDN, Ultimate Bride, and Bella Bianca. First appointment on June 10.',
        createdAt: new Date('2025-05-22'),
        updatedAt: new Date('2025-05-29')
      },
      {
        id: 19,
        title: 'Research bridesmaids dress options',
        description: 'Look into mix-and-match bridesmaid dress options in dusty blue and sage.',
        dueDate: new Date('2025-07-10'),
        status: 'not-started',
        notes: 'Consider Jenny Yoo, Azazie, and Birdy Grey for different price points. Collect sizes from bridesmaids.',
        createdAt: new Date('2025-05-27'),
        updatedAt: new Date('2025-05-27')
      },
      {
        id: 20,
        title: 'Schedule groom\'s suit consultation',
        description: 'Make appointment at Suit Supply for groom and groomsmen fittings.',
        dueDate: new Date('2025-07-15'),
        status: 'not-started',
        notes: 'Looking at navy suits with dusty blue ties or bow ties. Ask about rental vs. purchase options for groomsmen.',
        createdAt: new Date('2025-05-27'),
        updatedAt: new Date('2025-05-27')
      }
    ];

    // Insert tasks
    await queryInterface.bulkInsert('Tasks', tasks, {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Tasks';
    // Delete tasks
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};