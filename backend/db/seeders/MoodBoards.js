'use strict';

const { MoodBoard } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    
    const moodboards = [
      {
        name: "Rustic Garden Wedding",
        description: "Outdoor garden ceremony with natural wood elements, wildflower arrangements, and soft pastel color palette. Vintage-inspired decor with brass accents and linen tablecloths.",
        createdAt: now,
        updatedAt: now
      },
      {
        name: "Modern Minimalist Reception",
        description: "Clean lines, neutral color scheme with white, black, and gold accents. Geometric centerpieces, lucite chairs, and statement floral installations. Focus on architectural elements and negative space.",
        createdAt: now,
        updatedAt: now
      },
      {
        name: "Bohemian Beach Ceremony",
        description: "Oceanfront setting with macramé details, rattan furniture, and pampas grass installations. Sunset color palette with terracotta, rust, and cream tones. Relaxed, barefoot elegance.",
        createdAt: now,
        updatedAt: now
      },
      {
        name: "Elegant Ballroom Gala",
        description: "Classic black-tie affair with crystal chandeliers, tall white floral arrangements, and champagne color scheme. Gold chargers, velvet linens, and candlelight throughout the space.",
        createdAt: now,
        updatedAt: now
      },
      {
        name: "Industrial Chic Loft",
        description: "Exposed brick walls, hanging Edison bulbs, and greenery installations. Mix of wood and metal elements with amber lighting. Urban sophistication with a warm, inviting atmosphere.",
        createdAt: now,
        updatedAt: now
      },
      {
        name: "Enchanted Forest Theme",
        description: "Lush greenery, fairy lights, and moss-covered details. Dark emerald and midnight blue color palette with gold accents. Whimsical centerpieces featuring branches, ferns, and botanical elements.",
        createdAt: now,
        updatedAt: now
      },
      {
        name: "Vintage Hollywood Glamour",
        description: "Art deco inspiration with black, white, and gold color scheme. Feather centerpieces, sequin linens, and dramatic lighting. Classic film references and champagne tower feature.",
        createdAt: now,
        updatedAt: now
      },
      {
        name: "Mediterranean Villa Reception",
        description: "Terracotta pots with olive branches and citrus trees. Blue and white ceramic details with lemon accents. Al fresco dining setup with family-style service and string lights overhead.",
        createdAt: now,
        updatedAt: now
      },
      {
        name: "Winter Wonderland Celebration",
        description: "Frosted branches, crystal and silver accents, and white floral arrangements. Ice blue lighting with soft white draping. Cozy elements like faux fur throws and candle groupings.",
        createdAt: now,
        updatedAt: now
      },
      {
        name: "Tropical Paradise Destination",
        description: "Vibrant color palette with magenta, turquoise, and orange tones. Palm fronds, monstera leaves, and bird of paradise arrangements. Rattan furniture with colorful cushions and bamboo details.",
        createdAt: now,
        updatedAt: now
      }
    ];

    // Insert all mood boards into the MoodBoards table
    return queryInterface.bulkInsert('MoodBoards', moodboards, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'MoodBoards';
    // Remove all entries when rolling back the seeder
    return queryInterface.bulkDelete('MoodBoards', null, options);
  }
};