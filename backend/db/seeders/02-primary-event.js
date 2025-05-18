// 'use strict';

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA;
// }
// options.tableName = 'Users';

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     // Get users with roles that should have event ownership
//     const [users] = await queryInterface.sequelize.query(
//       `SELECT id, email FROM "Users" WHERE role NOT IN ('admin', 'user');`
//     );

//     // Get all events and group by user
//     const [events] = await queryInterface.sequelize.query(
//       `SELECT id, "UserId" FROM "Events" ORDER BY "createdAt" ASC;`
//     );

//     const eventsByUser = events.reduce((acc, event) => {
//       if (!acc[event.UserId]) acc[event.UserId] = [];
//       acc[event.UserId].push(event.id);
//       return acc;
//     }, {});

//     // Assign first event for each user as their primaryEventId
//     const updates = users.map(user => {
//       const firstEventId = eventsByUser[user.id]?.[0] || null;
//       return queryInterface.bulkUpdate(
//         options,
//         { primaryEventId: firstEventId },
//         { id: user.id }
//       );
//     });

//     return Promise.all(updates);
//   },

//   async down(queryInterface, Sequelize) {
//     return queryInterface.bulkUpdate(options, { primaryEventId: null }, {
//       role: {
//         [Sequelize.Op.notIn]: ['admin', 'user']
//       }
//     });
//   }
// };

'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Users';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Fetch all non-admin/non-user roles that should have a primary event
    const [users] = await queryInterface.sequelize.query(`
      SELECT id, email FROM "${options.schema ? `${options.schema}".` : ''}Users"
      WHERE role NOT IN ('admin', 'user');
    `);

    // Fetch all events with UserId
    const [events] = await queryInterface.sequelize.query(`
      SELECT id, "UserId" FROM "${options.schema ? `${options.schema}".` : ''}Events"
      ORDER BY "createdAt" ASC;
    `);

    // Map events by the user who owns them
    const eventsByUser = events.reduce((acc, event) => {
      if (!acc[event.UserId]) acc[event.UserId] = [];
      acc[event.UserId].push(event.id);
      return acc;
    }, {});

    // For each user, update their primaryEventId to the first event they own
    const updates = users.map(user => {
  const primaryEventId = eventsByUser[user.id]?.[0];
  if (primaryEventId !== undefined) {
    return queryInterface.bulkUpdate(
      options,
      { primaryEventId },
      { id: user.id }
    );
  }
  return null; // skip if no event
});

return Promise.all(updates.filter(Boolean));
  },

  async down(queryInterface, Sequelize) {
    // Reset primaryEventId for affected users
    return queryInterface.bulkUpdate(
      options,
      { primaryEventId: null },
      {
        role: {
          [Sequelize.Op.notIn]: ['admin', 'user']
        }
      }
    );
  }
};