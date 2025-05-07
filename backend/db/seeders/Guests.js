'use strict';
const { Guest } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    
    // RSVP dates and reminder dates
    const twoWeeksAgo = new Date(now);
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const threeDaysAgo = new Date(now);
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    
    const guests = [
      {
        primaryName: "James Wilson",
        primaryEmail: "jwilson@example.com",
        otherGuests: JSON.stringify([
          { name: "Sarah Wilson", relation: "spouse" }
        ]),
        numberInParty: 2,
        relation: "Bride's college roommate",
        rsvpStatus: "accepted",
        rsvpDate: twoWeeksAgo,
        actualAttendees: JSON.stringify([
          { name: "James Wilson" },
          { name: "Sarah Wilson" }
        ]),
        slowDanceSong: "At Last by Etta James",
        danceSong: "Uptown Funk by Bruno Mars",
        sentReminder: true,
        reminderDate: threeDaysAgo,
        qrCode: "GUEST001",
        createdAt: now,
        updatedAt: now
      },
      {
        primaryName: "Michael Rodriguez",
        primaryEmail: "mrodriguez@example.com",
        otherGuests: JSON.stringify([
          { name: "Jennifer Rodriguez", relation: "spouse" },
          { name: "Emma Rodriguez", relation: "child" },
          { name: "Noah Rodriguez", relation: "child" }
        ]),
        numberInParty: 4,
        relation: "Groom's cousin",
        rsvpStatus: "accepted",
        rsvpDate: oneWeekAgo,
        actualAttendees: JSON.stringify([
          { name: "Michael Rodriguez" },
          { name: "Jennifer Rodriguez" },
          { name: "Emma Rodriguez" },
          { name: "Noah Rodriguez" }
        ]),
        slowDanceSong: "Can't Help Falling in Love by Elvis Presley",
        danceSong: "Dynamite by BTS",
        sentReminder: true,
        reminderDate: threeDaysAgo,
        qrCode: "GUEST002",
        createdAt: now,
        updatedAt: now
      },
      {
        primaryName: "Emily Chang",
        primaryEmail: "echang@example.com",
        otherGuests: JSON.stringify([
          { name: "David Chang", relation: "spouse" }
        ]),
        numberInParty: 2,
        relation: "Bride's work colleague",
        rsvpStatus: "declined",
        rsvpDate: twoWeeksAgo,
        actualAttendees: JSON.stringify([]),
        slowDanceSong: null,
        danceSong: null,
        sentReminder: false,
        reminderDate: null,
        qrCode: "GUEST003",
        createdAt: now,
        updatedAt: now
      },
      {
        primaryName: "Robert Johnson",
        primaryEmail: "rjohnson@example.com",
        otherGuests: JSON.stringify([]),
        numberInParty: 1,
        relation: "Groom's childhood friend",
        rsvpStatus: "accepted",
        rsvpDate: twoWeeksAgo,
        actualAttendees: JSON.stringify([
          { name: "Robert Johnson" }
        ]),
        slowDanceSong: "Perfect by Ed Sheeran",
        danceSong: "Yeah! by Usher",
        sentReminder: true,
        reminderDate: threeDaysAgo,
        qrCode: "GUEST004",
        createdAt: now,
        updatedAt: now
      },
      {
        primaryName: "Sophia Martinez",
        primaryEmail: "smartinez@example.com",
        otherGuests: JSON.stringify([
          { name: "Daniel Martinez", relation: "spouse" }
        ]),
        numberInParty: 2,
        relation: "Bride's sister",
        rsvpStatus: "accepted",
        rsvpDate: twoWeeksAgo,
        actualAttendees: JSON.stringify([
          { name: "Sophia Martinez" },
          { name: "Daniel Martinez" }
        ]),
        slowDanceSong: "All of Me by John Legend",
        danceSong: "Shut Up and Dance by Walk the Moon",
        sentReminder: true,
        reminderDate: threeDaysAgo,
        qrCode: "GUEST005",
        createdAt: now,
        updatedAt: now
      },
      {
        primaryName: "William Taylor",
        primaryEmail: "wtaylor@example.com",
        otherGuests: JSON.stringify([
          { name: "Olivia Taylor", relation: "spouse" },
          { name: "Liam Taylor", relation: "child" }
        ]),
        numberInParty: 3,
        relation: "Groom's college friend",
        rsvpStatus: "pending",
        rsvpDate: null,
        actualAttendees: JSON.stringify([]),
        slowDanceSong: null,
        danceSong: null,
        sentReminder: true,
        reminderDate: threeDaysAgo,
        qrCode: "GUEST006",
        createdAt: now,
        updatedAt: now
      },
      {
        primaryName: "Elizabeth Brown",
        primaryEmail: "ebrown@example.com",
        otherGuests: JSON.stringify([]),
        numberInParty: 1,
        relation: "Bride's aunt",
        rsvpStatus: "accepted",
        rsvpDate: oneWeekAgo,
        actualAttendees: JSON.stringify([
          { name: "Elizabeth Brown" }
        ]),
        slowDanceSong: "Thinking Out Loud by Ed Sheeran",
        danceSong: "Dancing Queen by ABBA",
        sentReminder: true,
        reminderDate: threeDaysAgo,
        qrCode: "GUEST007",
        createdAt: now,
        updatedAt: now
      },
      {
        primaryName: "Alexander Davis",
        primaryEmail: "adavis@example.com",
        otherGuests: JSON.stringify([
          { name: "Isabella Davis", relation: "spouse" }
        ]),
        numberInParty: 2,
        relation: "Groom's work colleague",
        rsvpStatus: "accepted",
        rsvpDate: oneWeekAgo,
        actualAttendees: JSON.stringify([
          { name: "Alexander Davis" },
          { name: "Isabella Davis" }
        ]),
        slowDanceSong: "Wonderful Tonight by Eric Clapton",
        danceSong: "Blinding Lights by The Weeknd",
        sentReminder: true,
        reminderDate: threeDaysAgo,
        qrCode: "GUEST008",
        createdAt: now,
        updatedAt: now
      },
      {
        primaryName: "Victoria Lee",
        primaryEmail: "vlee@example.com",
        otherGuests: JSON.stringify([]),
        numberInParty: 1,
        relation: "Bride's high school friend",
        rsvpStatus: "declined",
        rsvpDate: twoWeeksAgo,
        actualAttendees: JSON.stringify([]),
        slowDanceSong: null,
        danceSong: null,
        sentReminder: false,
        reminderDate: null,
        qrCode: "GUEST009",
        createdAt: now,
        updatedAt: now
      },
      {
        primaryName: "Christopher Clark",
        primaryEmail: "cclark@example.com",
        otherGuests: JSON.stringify([
          { name: "Mia Clark", relation: "spouse" },
          { name: "Ethan Clark", relation: "child" },
          { name: "Ava Clark", relation: "child" }
        ]),
        numberInParty: 4,
        relation: "Groom's brother",
        rsvpStatus: "accepted",
        rsvpDate: twoWeeksAgo,
        actualAttendees: JSON.stringify([
          { name: "Christopher Clark" },
          { name: "Mia Clark" },
          { name: "Ethan Clark" },
          { name: "Ava Clark" }
        ]),
        slowDanceSong: "You Are the Reason by Calum Scott",
        danceSong: "Can't Stop the Feeling by Justin Timberlake",
        sentReminder: true,
        reminderDate: threeDaysAgo,
        qrCode: "GUEST010",
        createdAt: now,
        updatedAt: now
      },
      {
        primaryName: "Natalie Turner",
        primaryEmail: "nturner@example.com",
        otherGuests: JSON.stringify([
          { name: "Benjamin Turner", relation: "partner" }
        ]),
        numberInParty: 2,
        relation: "Bride's childhood friend",
        rsvpStatus: "pending",
        rsvpDate: null,
        actualAttendees: JSON.stringify([]),
        slowDanceSong: null,
        danceSong: null,
        sentReminder: true,
        reminderDate: threeDaysAgo,
        qrCode: "GUEST011",
        createdAt: now,
        updatedAt: now
      },
      {
        primaryName: "Jonathan White",
        primaryEmail: "jwhite@example.com",
        otherGuests: JSON.stringify([
          { name: "Charlotte White", relation: "spouse" }
        ]),
        numberInParty: 2,
        relation: "Groom's uncle",
        rsvpStatus: "accepted",
        rsvpDate: oneWeekAgo,
        actualAttendees: JSON.stringify([
          { name: "Jonathan White" },
          { name: "Charlotte White" }
        ]),
        slowDanceSong: "Can't Take My Eyes Off You by Frankie Valli",
        danceSong: "24K Magic by Bruno Mars",
        sentReminder: true,
        reminderDate: threeDaysAgo,
        qrCode: "GUEST012",
        createdAt: now,
        updatedAt: now
      }
    ];

    // Insert all guests into the Guests table
    return queryInterface.bulkInsert('Guests', guests, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Guests';
    // Remove all entries when rolling back the seeder
    return queryInterface.bulkDelete('Guests', null, options);
  }
};