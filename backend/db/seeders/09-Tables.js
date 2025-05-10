'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const tables = [
      {
        name: 'Table A',
        capacity: 8,
        tableType: 'round',
        positionX: 100,
        positionY: 200,
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Table B',
        capacity: 10,
        tableType: 'rectangular',
        positionX: 300,
        positionY: 200,
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Sweetheart Table',
        capacity: 2,
        tableType: 'custom',
        positionX: 500,
        positionY: 100,
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Family Table',
        capacity: 12,
        tableType: 'rectangular',
        positionX: 100,
        positionY: 400,
        createdAt: now,
        updatedAt: now
      }
    ];

    return queryInterface.bulkInsert('Tables', tables, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Tables';
    return queryInterface.bulkDelete(options, null, {});
  }
};