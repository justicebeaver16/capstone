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
      `SELECT id, name FROM capstone_schema."Members"`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const events = await queryInterface.sequelize.query(
      `SELECT id, title FROM capstone_schema."Events"`,
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
        MemberId: getMemberId('Emily Rivera'),
        EventId: getEventId('Miller-Johnson Wedding Reception'),
        createdAt: now,
        updatedAt: now
      },
      {
        title: 'Order flowers',
        description: 'Place order with florist by deadline.',
        dueDate: new Date('2025-05-25'),
        status: 'not-started',
        notes: '',
        MemberId: getMemberId('Sophia Kim'),
        EventId: getEventId('Wilson Corporate Gala'),
        createdAt: now,
        updatedAt: now
      }
    ].filter(task => task.memberId && task.eventId);

    if (tasks.length === 0) {
      console.warn('No valid tasks to insert. Skipping...');
      return;
    }

    return queryInterface.bulkInsert({tableName: "Tasks", schema: "capstone_schema"}, tasks, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Tasks';
    return queryInterface.bulkDelete(options, null, {});
  }
};