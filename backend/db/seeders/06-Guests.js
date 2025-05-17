// 'use strict';

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA;
// }
// options.tableName = 'Guests';

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     const now = new Date();

//     const events = await queryInterface.sequelize.query(
//       `SELECT id, title FROM "Events"`,
//       { type: Sequelize.QueryTypes.SELECT }
//     );

//     const getEventId = (title) => {
//       const event = events.find(e => e.title === title);
//       if (!event) console.warn(`Event not found: "${title}"`);
//       return event?.id || null;
//     };

//     const rawGuests = [
//       {
//         primaryName: 'Alex Johnson',
//         primaryEmail: 'alex.johnson@example.com',
//         numberInParty: 2,
//         otherGuests: ['Jamie Johnson'],
//         relation: 'Friend of the Bride',
//         rsvpStatus: 'accepted',
//         rsvpDate: new Date('2025-05-10'),
//         actualAttendees: ['Alex Johnson', 'Jamie Johnson'],
//         slowDanceSong: 'Thinking Out Loud - Ed Sheeran',
//         danceSong: 'Uptown Funk - Bruno Mars',
//         sentReminder: true,
//         reminderDate: new Date('2025-05-01'),
//         qrCode: 'alex-johnson-qr',
//         eventTitle: 'Miller-Johnson Wedding Ceremony'
//       },
//       {
//         primaryName: 'Taylor Smith',
//         primaryEmail: 'taylor.smith@example.com',
//         numberInParty: 1,
//         otherGuests: [],
//         relation: 'College Friend',
//         rsvpStatus: 'pending',
//         qrCode: 'taylor-smith-qr',
//         eventTitle: 'Miller-Johnson Wedding Ceremony'
//       },
//       {
//         primaryName: 'Morgan Lee',
//         primaryEmail: 'morgan.lee@example.com',
//         numberInParty: 3,
//         otherGuests: ['Chris Lee', 'Sam Lee'],
//         relation: 'Cousin',
//         rsvpStatus: 'accepted',
//         rsvpDate: new Date('2025-05-15'),
//         actualAttendees: ['Morgan Lee', 'Chris Lee', 'Sam Lee'],
//         sentReminder: false,
//         qrCode: 'morgan-lee-qr',
//         eventTitle: 'Miller-Johnson Wedding Reception'
//       }
//     ];

//     const guestsToInsert = rawGuests.map(g => ({
//       primaryName: g.primaryName,
//       primaryEmail: g.primaryEmail,
//       numberInParty: g.numberInParty,
//       otherGuests: JSON.stringify(g.otherGuests),
//       relation: g.relation,
//       rsvpStatus: g.rsvpStatus,
//       rsvpDate: g.rsvpDate || null,
//       actualAttendees: g.actualAttendees ? JSON.stringify(g.actualAttendees) : null,
//       slowDanceSong: g.slowDanceSong || null,
//       danceSong: g.danceSong || null,
//       sentReminder: g.sentReminder || false,
//       reminderDate: g.reminderDate || null,
//       qrCode: g.qrCode,
//       EventId: getEventId(g.eventTitle),
//       createdAt: now,
//       updatedAt: now
//     })).filter(g => {
//       if (!g.EventId) {
//         console.warn(`Skipping "${g.primaryName}" due to missing EventId`);
//         return false;
//       }
//       return true;
//     });

//     if (!guestsToInsert.length) {
//       console.warn('No valid guests to insert.');
//       return;
//     }

//     console.log(`Inserting ${guestsToInsert.length} guests...`);
//     return queryInterface.bulkInsert(options.tableName, guestsToInsert, options);
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

    const Events = await queryInterface.sequelize.query(
      `SELECT id, title FROM "Events"`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const getEventId = (title) => {
      const event = Events.find(e => e.title === title);
      if (!event) console.warn(`Event not found: "${title}"`);
      return event ? event.id : null;
    };

    const guests = [
      {
        primaryName: 'Alex Johnson',
        primaryEmail: 'alex.johnson@example.com',
        numberInParty: 2,
        otherGuests: JSON.stringify(['Jamie Johnson']),
        relation: 'Friend of the Bride',
        rsvpStatus: 'accepted',
        rsvpDate: new Date('2025-05-10'),
        actualAttendees: JSON.stringify(['Alex Johnson', 'Jamie Johnson']),
        slowDanceSong: 'Thinking Out Loud - Ed Sheeran',
        danceSong: 'Uptown Funk - Bruno Mars',
        sentReminder: true,
        reminderDate: new Date('2025-05-01'),
        qrCode: 'alex-johnson-qr',
        EventId: getEventId('Miller-Johnson Wedding Ceremony'),
        createdAt: now,
        updatedAt: now
      },
      {
        primaryName: 'Taylor Smith',
        primaryEmail: 'taylor.smith@example.com',
        numberInParty: 1,
        otherGuests: JSON.stringify([]),
        relation: 'College Friend',
        rsvpStatus: 'pending',
        qrCode: 'taylor-smith-qr',
        EventId: getEventId('Miller-Johnson Wedding Ceremony'),
        createdAt: now,
        updatedAt: now
      },
      {
        primaryName: 'Morgan Lee',
        primaryEmail: 'morgan.lee@example.com',
        numberInParty: 3,
        otherGuests: JSON.stringify(['Chris Lee', 'Sam Lee']),
        relation: 'Cousin',
        rsvpStatus: 'accepted',
        rsvpDate: new Date('2025-05-15'),
        actualAttendees: JSON.stringify(['Morgan Lee', 'Chris Lee', 'Sam Lee']),
        sentReminder: false,
        qrCode: 'morgan-lee-qr',
        EventId: getEventId('Miller-Johnson Wedding Reception'),
        createdAt: now,
        updatedAt: now
      }
    ];

    const validGuests = guests.filter(g => g.EventId);
    if (!validGuests.length) {
      console.warn('No valid guests to insert. Seeder skipped.');
      return;
    }

    console.log('Inserting guests:', validGuests.map(g => ({
      name: g.primaryName,
      EventId: g.EventId
    })));

    return queryInterface.bulkInsert('Guests', validGuests, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Guests';
    return queryInterface.bulkDelete(options, null, {});
  }
};