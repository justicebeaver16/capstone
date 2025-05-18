'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Users';

const schema = options.schema ? options.schema : '';

module.exports = {
  async up(queryInterface, Sequelize) {
    const [users] = await queryInterface.sequelize.query(`
      SELECT id, email FROM ${schema}."Users"
      WHERE role NOT IN ('admin', 'user');
    `);

    const [events] = await queryInterface.sequelize.query(`
      SELECT id, "UserId" FROM ${schema}."Events"
      ORDER BY "createdAt" ASC;
    `);

    const eventsByUser = events.reduce((acc, event) => {
      if (!acc[event.UserId]) acc[event.UserId] = [];
      acc[event.UserId].push(event.id);
      return acc;
    }, {});

    const updates = users.map(user => {
      const primaryEventId = eventsByUser[user.id]?.[0];
      if (primaryEventId !== undefined) {
        return queryInterface.bulkUpdate(
          options,
          { primaryEventId },
          { id: user.id }
        );
      }
      return null;
    });

    return Promise.all(updates.filter(Boolean));
  },

  async down(queryInterface, Sequelize) {
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