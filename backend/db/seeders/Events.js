'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    
    // Create event dates
    const futureDate1 = new Date(now);
    futureDate1.setDate(futureDate1.getDate() + 60); // 2 months in future
    
    const futureDate2 = new Date(now);
    futureDate2.setDate(futureDate2.getDate() + 75); // 2.5 months in future
    
    const futureDate3 = new Date(now);
    futureDate3.setDate(futureDate3.getDate() + 90); // 3 months in future
    
    const futureDate4 = new Date(now);
    futureDate4.setDate(futureDate4.getDate() + 30); // 1 month in future
    
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
        description: "Elegant ceremony in the historic Chicago Room with views of Lincoln Park. Floral arrangements by Fleur Inc featuring seasonal blooms in ivory and blush. Photography by Greenhouse Loft Photography.",
        eventType: "Wedding Ceremony",
        status: "upcoming",
        createdAt: now,
        updatedAt: now
      },
      {
        title: "Miller-Johnson Wedding Reception",
        date: new Date(futureDate1.getTime() + 3 * 60 * 60 * 1000), // 3 hours after ceremony
        address: "The Langham Chicago",
        city: "Chicago",
        state: "IL",
        zipCode: "60611",
        latitude: 41.888411,
        longitude: -87.627456,
        description: "Formal dinner reception in the Devonshire Ballroom with panoramic city views. Catering by Blue Plate featuring sustainable, locally-sourced cuisine. Music by Toast & Jam DJs. Custom cake by West Town Bakery.",
        eventType: "Wedding Reception",
        status: "upcoming",
        createdAt: now,
        updatedAt: now
      },
      {
        title: "Miller-Johnson Rehearsal Dinner",
        date: new Date(futureDate1.getTime() - 24 * 60 * 60 * 1000), // 1 day before ceremony
        address: "The Langham Chicago",
        city: "Chicago",
        state: "IL",
        zipCode: "60611",
        latitude: 41.888411,
        longitude: -87.627456,
        description: "Private dinner in the Founder's Room for wedding party and immediate family. Catering by Fig Catering with custom menu featuring seasonal specialties. Transportation provided by Windy City Limousine.",
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
        description: "Casual celebration with close friends and family. Custom dessert table and sustainable decor. Photography by George Street Photo & Video. Event coordination by LK Events.",
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
        description: "25th anniversary vow renewal and dinner. Luxury decor by HMR Designs with white and silver theme. Catering by Blue Plate featuring a recreation of their original wedding menu. Music by Toast & Jam DJs.",
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
        description: "Annual fundraiser with silent auction and keynote speaker. Audio/visual services by AVFX Chicago. Catering by Fig Catering with custom menu. Security services by Monterrey Security. Full event planning by LK Events.",
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
        description: "Celebration honoring Maria Rodriguez's 30 years at the firm. Catering by Blue Plate with custom menu and cocktails. Photography by Greenhouse Loft Photography. Floral arrangements by Fleur Inc.",
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
        description: "Annual gathering with catered lunch and activities for all ages. Catering by Fig Catering featuring family-style service. Photography by Greenhouse Loft Photography. Transportation arranged by Windy City Limousine.",
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
        description: "Elegant ceremony and reception with 150 guests. Catering by Fig Catering with seasonal menu. Decor by HMR Designs featuring suspended floral installations. Photography and videography by George Street Photo & Video.",
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
        description: "Garden tea party themed celebration with bride's friends and family. Catering by Fig Catering featuring tea service and custom pastries. Floral arrangements by Fleur Inc. Transportation for out-of-town guests by Windy City Limousine.",
        eventType: "Bridal Shower",
        status: "upcoming",
        createdAt: now,
        updatedAt: now
      }
    ];

    // Insert all events into the Events table
    return queryInterface.bulkInsert('Events', events, {});
  },

  async down(queryInterface, Sequelize) {
    // Remove all entries when rolling back the seeder
    return queryInterface.bulkDelete('Events', null, {});
  }
};