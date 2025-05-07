'use strict';

// const { GuestAttendee } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'GuestAttendees';

    const guestAttendees = [
      { name: 'Sarah Wilson', mealChoice: 'Chicken' },
      { name: 'Jennifer Rodriguez', mealChoice: 'Vegetarian' },
      { name: 'Emma Rodriguez', mealChoice: 'Kid\'s Meal' },
      { name: 'Noah Rodriguez', mealChoice: 'Kid\'s Meal' },
      { name: 'David Chang', mealChoice: 'Beef' },
      { name: 'Daniel Martinez', mealChoice: 'Fish' },
      { name: 'Olivia Taylor', mealChoice: 'Vegetarian' },
      { name: 'Liam Taylor', mealChoice: 'Kid\'s Meal' },
      { name: 'Isabella Davis', mealChoice: 'Chicken' },
      { name: 'Mia Clark', mealChoice: 'Beef' },
      { name: 'Ethan Clark', mealChoice: 'Kid\'s Meal' },
      { name: 'Ava Clark', mealChoice: 'Kid\'s Meal' },
      { name: 'Benjamin Turner', mealChoice: 'Fish' },
      { name: 'Charlotte White', mealChoice: 'Chicken' }
    ];

    return queryInterface.bulkInsert(options, guestAttendees);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'GuestAttendees';
    return queryInterface.bulkDelete(options, null, options);
  }
};