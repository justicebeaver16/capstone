'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const Guests = await queryInterface.sequelize.query(
      `SELECT id, "primaryName" FROM capstone_schema."Guests"`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const getGuestId = (primaryName) => {
      const match = Guests.find(g => g.primaryName === primaryName);
      return match ? match.id : null;
    };

    const attendees = [
      {
        name: 'Jamie Johnson',
        mealChoice: 'Vegetarian',
        guestId: getGuestId('Alex Johnson'),
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Chris Lee',
        mealChoice: 'Beef',
        guestId: getGuestId('Morgan Lee'),
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Sam Lee',
        mealChoice: 'Chicken',
        guestId: getGuestId('Morgan Lee'),
        createdAt: now,
        updatedAt: now
      }
    ].filter(a => a.guestId); // only keep valid records

    if (attendees.length === 0) {
      console.warn('No GuestAttendees to insert. Skipping...');
      return;
    }

    console.log('GuestAttendee rows to insert:', attendees);

    return queryInterface.bulkInsert({tableName: "GuestAttendees", schema: "capstone_schema"}, attendees, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'GuestAttendees';
    return queryInterface.bulkDelete(options, null, {});
  }
};