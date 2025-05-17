// 'use strict';

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA;
// }
// options.tableName = 'Tasks';

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     const now = new Date();

//     // Fetch Members and Events
//     const [members] = await queryInterface.sequelize.query(
//       `SELECT id, name FROM "Members";`,
//       { type: Sequelize.QueryTypes.SELECT }
//     );

//     const [events] = await queryInterface.sequelize.query(
//       `SELECT id, title FROM "Events";`,
//       { type: Sequelize.QueryTypes.SELECT }
//     );

//     const getMemberId = (name) => {
//       const found = members.find(m => m.name === name);
//       if (!found) console.warn(`Member not found: "${name}"`);
//       return found?.id || null;
//     };

//     const getEventId = (title) => {
//       const found = events.find(e => e.title === title);
//       if (!found) console.warn(`Event not found: "${title}"`);
//       return found?.id || null;
//     };

//     const rawTasks = [
//       {
//         title: 'Finalize seating chart',
//         description: 'Confirm final layout and guest arrangement.',
//         dueDate: new Date('2025-06-01'),
//         status: 'in-progress',
//         notes: 'Waiting on final RSVP list.',
//         memberName: 'Emily Rivera',
//         eventTitle: 'Miller-Johnson Wedding Reception'
//       },
//       {
//         title: 'Order flowers',
//         description: 'Place order with florist by deadline.',
//         dueDate: new Date('2025-05-25'),
//         status: 'not-started',
//         notes: '',
//         memberName: 'Sophia Kim',
//         eventTitle: 'Wilson Corporate Gala'
//       }
//     ];

//     const tasks = rawTasks.map(task => ({
//       title: task.title,
//       description: task.description,
//       dueDate: task.dueDate,
//       status: task.status,
//       notes: task.notes,
//       memberId: getMemberId(task.memberName),
//       eventId: getEventId(task.eventTitle),
//       createdAt: now,
//       updatedAt: now
//     })).filter(task => task.memberId && task.eventId);

//     if (tasks.length === 0) {
//       console.warn('No valid tasks to insert.');
//       return;
//     }

//     console.log('Inserting tasks:', tasks.map(t => ({
//       title: t.title,
//       memberId: t.memberId,
//       eventId: t.eventId
//     })));

//     return queryInterface.bulkInsert(options.tableName, tasks, options);
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

    // Fetch Members and Events
    const members = await queryInterface.sequelize.query(
      `SELECT id, name FROM "Members"`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const events = await queryInterface.sequelize.query(
      `SELECT id, title FROM "Events"`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const getMemberId = (name) => {
      const m = members.find(member => member.name === name);
      return m ? m.id : null;
    };

    const getEventId = (title) => {
      const e = events.find(event => event.title === title);
      return e ? e.id : null;
    };

    const tasks = [
      {
        title: 'Finalize seating chart',
        description: 'Confirm final layout and guest arrangement.',
        dueDate: new Date('2025-06-01'),
        status: 'in-progress',
        notes: 'Waiting on final RSVP list.',
        memberId: getMemberId('Emily Rivera'),
        eventId: getEventId('Miller-Johnson Wedding Reception'),
        createdAt: now,
        updatedAt: now
      },
      {
        title: 'Order flowers',
        description: 'Place order with florist by deadline.',
        dueDate: new Date('2025-05-25'),
        status: 'not-started',
        notes: '',
        memberId: getMemberId('Sophia Kim'),
        eventId: getEventId('Wilson Corporate Gala'),
        createdAt: now,
        updatedAt: now
      }
    ].filter(task => task.memberId && task.eventId);

    if (tasks.length === 0) {
      console.warn('No valid tasks to insert. Skipping...');
      return;
    }

    return queryInterface.bulkInsert('Tasks', tasks, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Tasks';
    return queryInterface.bulkDelete(options, null, {});
  }
};