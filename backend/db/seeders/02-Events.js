'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
const schema = options.schema ? `"${options.schema}".` : '';

module.exports = {
  async up(queryInterface, Sequelize) {

const [users] = await queryInterface.sequelize.query(
  `SELECT id, email FROM "Users" ORDER BY id ASC;`
);
const userMap = users.reduce((acc, user) => {
      acc[user.email] = user.id;
      return acc;
    }, {});

    const now = new Date();
    const events = [
      {
        title: 'Miller-Johnson Wedding Ceremony',
        date: new Date('2025-06-14'),
        address: '123 Garden Ave',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        latitude: 41.881832,
        longitude: -87.623177,
        description: 'Outdoor ceremony at the Rose Garden with family and friends.',
        eventType: 'wedding',
        status: 'upcoming',
        UserId: userMap['olivia.martinez@example.com']
      },
      {
        title: 'Miller-Johnson Wedding Reception',
        date: new Date('2025-06-14'),
        address: '456 Grand Ballroom Dr',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60611',
        latitude: 41.892,
        longitude: -87.621,
        description: 'Formal reception with dining, dancing, and speeches.',
        eventType: 'reception',
        status: 'planning',
        UserId: userMap['bride@example.com']
      },
      {
        title: 'Clark Anniversary Celebration',
        date: new Date('2025-09-10'),
        address: '789 Sunset Ln',
        city: 'Evanston',
        state: 'IL',
        zipCode: '60201',
        description: 'Celebration of 10 years of love and commitment.',
        eventType: 'anniversary',
        status: 'planning',
        UserId: userMap['bride@example.com']
      },
      {
        title: 'Thompson-Garcia Engagement Party',
        date: new Date('2025-05-30'),
        address: '22 Lakeside Ave',
        city: 'Naperville',
        state: 'IL',
        zipCode: '60540',
        description: 'An intimate engagement party with close friends.',
        eventType: 'engagement',
        status: 'upcoming',
        UserId: userMap['bride@example.com']
      },
      {
        title: 'Wilson Corporate Gala',
        date: new Date('2025-11-01'),
        address: '980 Commerce Blvd',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60607',
        description: 'Annual gala event for corporate partners and clients.',
        eventType: 'corporate',
        status: 'planning',
        UserId: userMap['bride@example.com']
      },
      {
        title: 'Taylor Bridal Shower',
        date: new Date('2025-07-20'),
        address: '245 Tea House Ln',
        city: 'Oak Park',
        state: 'IL',
        zipCode: '60302',
        description: 'Garden-style bridal shower for Taylor and guests.',
        eventType: 'bridal-shower',
        status: 'upcoming',
        UserId: userMap['bride@example.com']
      }
    ];

    const eventsToInsert = events.map((event) => ({
      ...event,
      createdAt: now,
      updatedAt: now
    }));

    await queryInterface.bulkInsert('Events', eventsToInsert, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Events';
    return queryInterface.bulkDelete(options, null, options);
  }
};