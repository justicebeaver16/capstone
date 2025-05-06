'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // All existing guests IDs
    const guests = await queryInterface.sequelize.query(
      `SELECT id, primaryName, otherGuests FROM "Guests";`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Avoid duplicates
    const attendees = await queryInterface.sequelize.query(
      `SELECT "GuestId", name FROM "GuestAttendees";`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Create other guests only if we have guests
    if (guests.length === 0) {
      console.log('No guests found. Please run the Guests seeder first.');
      return;
    }

    const otherGuests = [];

    // Create other guest records based on otherGuests field for each guest
    guests.forEach(guest => {
      const otherGuestsData = JSON.parse(guest.otherGuests || '[]');
      
      // Create an other guest record for each person in the otherGuests array
      otherGuestsData.forEach(otherGuest => {
        // Check if this person is already in GuestAttendees
        const isAlreadyAttendee = attendees.some(
          attendee => attendee.GuestId === guest.id && attendee.name === otherGuest.name
        );
        
        // Only add to OtherGuests if they're not already an attendee
        if (!isAlreadyAttendee) {
          otherGuests.push({
            GuestId: guest.id,
            name: otherGuest.name
          });
        }
      });
    });

    // Insert all other guests into the OtherGuests table
    return queryInterface.bulkInsert('OtherGuests', otherGuests, {});
  },

  async down(queryInterface, Sequelize) {
    // Remove all entries when rolling back the seeder
    return queryInterface.bulkDelete('OtherGuests', null, {});
  }
};