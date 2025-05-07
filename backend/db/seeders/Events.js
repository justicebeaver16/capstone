'use strict';

const { Event } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const futureDate1 = new Date(now);
    futureDate1.setDate(futureDate1.getDate() + 60);

    const futureDate2 = new Date(now);
    futureDate2.setDate(futureDate2.getDate() + 75);

    const futureDate3 = new Date(now);
    futureDate3.setDate(futureDate3.getDate() + 90);

    const futureDate4 = new Date(now);
    futureDate4.setDate(futureDate4.getDate() + 30);

    const pastDate1 = new Date(now);
    pastDate1.setDate(pastDate1.getDate() - 30);

    const pastDate2 = new Date(now);
    pastDate2.setDate(pastDate2.getDate() - 60);

    const events = [
      {
        title: "Miller-Johnson Wedding Ceremony",
        date: futureDate1,
        address: "Chicago History Museum",
        city: "Chicago",
        state: "IL",
        zipCode: "60614",
        latitude: 41.911973,
        longitude: -87.631674,
        description: "Elegant ceremony in the historic Chicago Room with views of Lincoln Park...",
        eventType: "Wedding Ceremony",
        status: "upcoming",
        createdAt: now,
        updatedAt: now
      },
      {
        title: "Miller-Johnson Wedding Reception",
        date: new Date(futureDate1.getTime() + 3 * 60 * 60 * 1000),
        address: "The Langham Chicago",
        city: "Chicago",
        state: "IL",
        zipCode: "60611",
        latitude: 41.888411,
        longitude: -87.627456,
        description: "Formal dinner reception in the Devonshire Ballroom...",
        eventType: "Wedding Reception",
        status: "upcoming",
        createdAt: now,
        updatedAt: now
      },
      {
        title: "Miller-Johnson Rehearsal Dinner",
        date: new Date(futureDate1.getTime() - 24 * 60 * 60 * 1000),
        address: "The Langham Chicago",
        city: "Chicago",
        state: "IL",
        zipCode: "60611",
        latitude: 41.888411,
        longitude: -87.627456,
        description: "Private dinner in the Founder's Room for wedding party and immediate family...",
        eventType: "Rehearsal Dinner",
        status: "upcoming",
        createdAt: now,
        updatedAt: now
      },
      {
        title: "Thompson-Garcia Engagement Party",
        date: futureDate4,
        address: "West Town Bakery",
        city: "Chicago",
        state: "IL",
        zipCode: "60622",
        latitude: 41.896220,
        longitude: -87.676008,
        description: "Casual celebration with close friends and family...",
        eventType: "Engagement Party",
        status: "upcoming",
        createdAt: now,
        updatedAt: now
      },
      {
        title: "Clark Anniversary Celebration",
        date: futureDate2,
        address: "The Langham Chicago",
        city: "Chicago",
        state: "IL",
        zipCode: "60611",
        latitude: 41.888411,
        longitude: -87.627456,
        description: "25th anniversary vow renewal and dinner...",
        eventType: "Anniversary",
        status: "upcoming",
        createdAt: now,
        updatedAt: now
      },
      {
        title: "Wilson Corporate Gala",
        date: futureDate3,
        address: "Chicago History Museum",
        city: "Chicago",
        state: "IL",
        zipCode: "60614",
        latitude: 41.911973,
        longitude: -87.631674,
        description: "Annual fundraiser with silent auction and keynote speaker...",
        eventType: "Corporate Event",
        status: "planning",
        createdAt: now,
        updatedAt: now
      },
      {
        title: "Rodriguez Retirement Party",
        date: pastDate1,
        address: "The Langham Chicago",
        city: "Chicago",
        state: "IL",
        zipCode: "60611",
        latitude: 41.888411,
        longitude: -87.627456,
        description: "Celebration honoring Maria Rodriguez's 30 years at the firm...",
        eventType: "Retirement Party",
        status: "completed",
        createdAt: now,
        updatedAt: now
      },
      {
        title: "Chen Family Reunion",
        date: pastDate2,
        address: "Chicago History Museum",
        city: "Chicago",
        state: "IL",
        zipCode: "60614",
        latitude: 41.911973,
        longitude: -87.631674,
        description: "Annual gathering with catered lunch and activities for all ages...",
        eventType: "Family Reunion",
        status: "completed",
        createdAt: now,
        updatedAt: now
      },
      {
        title: "Williams-Brown Wedding",
        date: pastDate2,
        address: "The Langham Chicago",
        city: "Chicago",
        state: "IL",
        zipCode: "60611",
        latitude: 41.888411,
        longitude: -87.627456,
        description: "Elegant ceremony and reception with 150 guests...",
        eventType: "Wedding",
        status: "completed",
        createdAt: now,
        updatedAt: now
      },
      {
        title: "Taylor Bridal Shower",
        date: futureDate4,
        address: "Fig Catering",
        city: "Chicago",
        state: "IL",
        zipCode: "60608",
        latitude: 41.856872,
        longitude: -87.661508,
        description: "Garden tea party themed celebration with bride's friends and family...",
        eventType: "Bridal Shower",
        status: "upcoming",
        createdAt: now,
        updatedAt: now
      }
    ];

    return queryInterface.bulkInsert('Events', events, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Events';
    return queryInterface.bulkDelete('Events', null, options);
  }
};