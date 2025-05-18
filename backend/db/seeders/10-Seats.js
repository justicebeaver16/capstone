'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // Fetch Tables and Guests
    const Tables = await queryInterface.sequelize.query(
      `SELECT id, name FROM capstone_schema."Tables"`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const Guests = await queryInterface.sequelize.query(
      `SELECT id, "primaryName" FROM capstone_schema."Guests"`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const getTableId = (name) => {
      const table = Tables.find(t => t.name === name);
      return table ? table.id : null;
    };

    const getGuestId = (name) => {
      const guest = Guests.find(g => g.primaryName === name);
      return guest ? guest.id : null;
    };

    const seats = [
      // Table A
      {
        seatNumber: 1,
        guestName: 'Alex Johnson',
        assigned: true,
        guestId: getGuestId('Alex Johnson'),
        tableId: getTableId('Table A'),
        createdAt: now,
        updatedAt: now
      },
      {
        seatNumber: 2,
        guestName: 'Jamie Johnson',
        assigned: true,
        guestId: null, // not in Guests table
        tableId: getTableId('Table A'),
        createdAt: now,
        updatedAt: now
      },
      {
        seatNumber: 3,
        assigned: false,
        tableId: getTableId('Table A'),
        createdAt: now,
        updatedAt: now
      },

      // Sweetheart Table
      {
        seatNumber: 1,
        guestName: 'Taylor Smith',
        assigned: true,
        guestId: getGuestId('Taylor Smith'),
        tableId: getTableId('Sweetheart Table'),
        createdAt: now,
        updatedAt: now
      },

      // Table B
      {
        seatNumber: 1,
        assigned: false,
        tableId: getTableId('Table B'),
        createdAt: now,
        updatedAt: now
      },
      {
        seatNumber: 2,
        guestName: 'Morgan Lee',
        assigned: true,
        guestId: getGuestId('Morgan Lee'),
        tableId: getTableId('Table B'),
        createdAt: now,
        updatedAt: now
      }
    ].filter(seat => seat.tableId); // Only insert if linked to a valid table

    return queryInterface.bulkInsert({tableName: "Seats", schema: "capstone_schema"}, seats, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Seats';
    return queryInterface.bulkDelete(options, null, {});
  }
};