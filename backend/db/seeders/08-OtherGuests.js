'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const guests = await queryInterface.sequelize.query(
      `SELECT id, "primaryName" FROM capstone_schema."Guests"`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const getGuestId = (primaryName) => {
      const match = guests.find(g => g.primaryName === primaryName);
      return match ? match.id : null;
    };

    const otherGuests = [
      {
        name: 'Jamie Johnson',
        guestId: getGuestId('Alex Johnson'),
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Chris Lee',
        guestId: getGuestId('Morgan Lee'),
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Sam Lee',
        guestId: getGuestId('Morgan Lee'),
        createdAt: now,
        updatedAt: now
      }
    ].filter(g => g.guestId);

    if (otherGuests.length === 0) {
      console.warn('No OtherGuests to insert. Skipping...');
      return;
    }

    console.log('Resolved OtherGuests:', otherGuests);

    return queryInterface.bulkInsert({tableName: "OtherGuests", schema: "capstone_schema"}, otherGuests, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'OtherGuests';
    return queryInterface.bulkDelete(options, null, {});
  }
};