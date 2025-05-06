'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    
    // Existing mood boards to reference their IDs
    const moodBoards = await queryInterface.sequelize.query(
      `SELECT id, name FROM "MoodBoards";`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (moodBoards.length === 0) {
      console.log('No mood boards found. Please run the MoodBoards seeder first.');
      return;
    }

    // Store items for each mood board
    const moodBoardItems = [];

    // Find mood board ID by name
    const findMoodBoardIdByName = (name) => {
      const board = moodBoards.find(board => board.name === name);
      return board ? board.id : null;
    };

    // Rustic Garden Wedding items
    const rusticGardenId = findMoodBoardIdByName("Rustic Garden Wedding");
    if (rusticGardenId) {
      moodBoardItems.push(
        {
          MoodBoardId: rusticGardenId,
          type: "image",
          content: "https://images.unsplash.com/photo-1510076857177-7470076d4098",
          description: "Wooden arch with wildflowers for ceremony",
          source: "Unsplash",
          tags: JSON.stringify(["arch", "ceremony", "wildflowers"]),
          positionX: 10,
          positionY: 10,
          width: 300,
          height: 200,
          createdAt: now,
          updatedAt: now
        },
        {
          MoodBoardId: rusticGardenId,
          type: "image",
          content: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6",
          description: "Mason jar centerpieces with baby's breath",
          source: "Unsplash",
          tags: JSON.stringify(["centerpiece", "mason jar", "rustic"]),
          positionX: 320,
          positionY: 10,
          width: 200,
          height: 250,
          createdAt: now,
          updatedAt: now
        },
        {
          MoodBoardId: rusticGardenId,
          type: "note",
          content: "Color palette: Sage green, dusty rose, ivory, and hints of lavender",
          description: "Main color scheme",
          tags: JSON.stringify(["colors", "palette"]),
          positionX: 10,
          positionY: 220,
          width: 250,
          height: 100,
          createdAt: now,
          updatedAt: now
        },
        {
          MoodBoardId: rusticGardenId,
          type: "link",
          content: "https://www.etsy.com/shop/rusticweddingdecor",
          description: "Handcrafted wooden signs and table numbers",
          source: "Etsy",
          tags: JSON.stringify(["decor", "signage", "purchase"]),
          positionX: 270,
          positionY: 270,
          width: 250,
          height: 100,
          createdAt: now,
          updatedAt: now
        }
      );
    }

    // Modern Minimalist Reception items
    const modernMinimalistId = findMoodBoardIdByName("Modern Minimalist Reception");
    if (modernMinimalistId) {
      moodBoardItems.push(
        {
          MoodBoardId: modernMinimalistId,
          type: "image",
          content: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
          description: "Geometric gold and glass terrarium centerpiece",
          source: "Unsplash",
          tags: JSON.stringify(["centerpiece", "geometric", "modern"]),
          positionX: 20,
          positionY: 20,
          width: 250,
          height: 250,
          createdAt: now,
          updatedAt: now
        },
        {
          MoodBoardId: modernMinimalistId,
          type: "image",
          content: "https://images.unsplash.com/photo-1507504031003-b417219a0fde",
          description: "White acrylic ghost chairs",
          source: "Unsplash",
          tags: JSON.stringify(["furniture", "chairs", "rental"]),
          positionX: 280,
          positionY: 20,
          width: 200,
          height: 200,
          createdAt: now,
          updatedAt: now
        },
        {
          MoodBoardId: modernMinimalistId,
          type: "note",
          content: "Color palette: White, black, brushed gold, with hints of concrete gray",
          description: "Color scheme for all design elements",
          tags: JSON.stringify(["colors", "palette"]),
          positionX: 20,
          positionY: 280,
          width: 250,
          height: 100,
          createdAt: now,
          updatedAt: now
        },
        {
          MoodBoardId: modernMinimalistId,
          type: "link",
          content: "https://www.cb2.com/modern-tableware",
          description: "Sleek tableware options for a clean look",
          source: "CB2",
          tags: JSON.stringify(["tableware", "purchase", "rental"]),
          positionX: 280,
          positionY: 230,
          width: 250,
          height: 120,
          createdAt: now,
          updatedAt: now
        }
      );
    }

    // Bohemian Beach Ceremony items
    const bohemianBeachId = findMoodBoardIdByName("Bohemian Beach Ceremony");
    if (bohemianBeachId) {
      moodBoardItems.push(
        {
          MoodBoardId: bohemianBeachId,
          type: "image",
          content: "https://images.unsplash.com/photo-1544113415-175e90ac8024",
          description: "Macramé ceremony backdrop with pampas grass",
          source: "Unsplash",
          tags: JSON.stringify(["backdrop", "ceremony", "boho"]),
          positionX: 30,
          positionY: 30,
          width: 300,
          height: 220,
          createdAt: now,
          updatedAt: now
        },
        {
          MoodBoardId: bohemianBeachId,
          type: "image",
          content: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e",
          description: "Low seating arrangement with floor cushions",
          source: "Unsplash",
          tags: JSON.stringify(["seating", "lounge", "casual"]),
          positionX: 340,
          positionY: 30,
          width: 220,
          height: 220,
          createdAt: now,
          updatedAt: now
        },
        {
          MoodBoardId: bohemianBeachId,
          type: "note",
          content: "Color palette: Terracotta, rust, sand, cream, with touches of turquoise",
          description: "Beach-inspired color scheme",
          tags: JSON.stringify(["colors", "palette"]),
          positionX: 30,
          positionY: 260,
          width: 250,
          height: 100,
          createdAt: now,
          updatedAt: now
        },
        {
          MoodBoardId: bohemianBeachId,
          type: "link",
          content: "https://www.etsy.com/shop/bohemiandecor",
          description: "Hand-dyed silk ribbons and macramé details",
          source: "Etsy",
          tags: JSON.stringify(["decor", "textiles", "purchase"]),
          positionX: 340,
          positionY: 260,
          width: 250,
          height: 100,
          createdAt: now,
          updatedAt: now
        }
      );
    }

    // Elegant Ballroom Gala items
    const elegantBallroomId = findMoodBoardIdByName("Elegant Ballroom Gala");
    if (elegantBallroomId) {
      moodBoardItems.push(
        {
          MoodBoardId: elegantBallroomId,
          type: "image",
          content: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
          description: "Crystal chandeliers and dramatic ceiling draping",
          source: "Unsplash",
          tags: JSON.stringify(["lighting", "ceiling", "luxury"]),
          positionX: 15,
          positionY: 15,
          width: 300,
          height: 200,
          createdAt: now,
          updatedAt: now
        },
        {
          MoodBoardId: elegantBallroomId,
          type: "image",
          content: "https://images.unsplash.com/photo-1478146059778-26028b07395a",
          description: "Tall white rose and hydrangea centerpieces",
          source: "Unsplash",
          tags: JSON.stringify(["centerpiece", "florals", "white"]),
          positionX: 325,
          positionY: 15,
          width: 200,
          height: 250,
          createdAt: now,
          updatedAt: now
        },
        {
          MoodBoardId: elegantBallroomId,
          type: "note",
          content: "Color palette: Ivory, champagne, gold, with accents of blush",
          description: "Luxurious neutral palette",
          tags: JSON.stringify(["colors", "palette", "neutral"]),
          positionX: 15,
          positionY: 225,
          width: 250,
          height: 100,
          createdAt: now,
          updatedAt: now
        },
        {
          MoodBoardId: elegantBallroomId,
          type: "link",
          content: "https://www.bhldn.com/categories/shop-the-bride-little-white-dresses",
          description: "Options for elegant dress change for reception",
          source: "BHLDN",
          tags: JSON.stringify(["fashion", "attire", "bride"]),
          positionX: 275,
          positionY: 275,
          width: 250,
          height: 100,
          createdAt: now,
          updatedAt: now
        }
      );
    }

    // Industrial Chic Loft items
    const industrialChicId = findMoodBoardIdByName("Industrial Chic Loft");
    if (industrialChicId) {
      moodBoardItems.push(
        {
          MoodBoardId: industrialChicId,
          type: "image",
          content: "https://images.unsplash.com/photo-1519671482248-9a41049469a0",
          description: "Edison bulb installation over long tables",
          source: "Unsplash",
          tags: JSON.stringify(["lighting", "industrial", "ceiling"]),
          positionX: 25,
          positionY: 25,
          width: 280,
          height: 200,
          createdAt: now,
          updatedAt: now
        },
        {
          MoodBoardId: industrialChicId,
          type: "image",
          content: "https://images.unsplash.com/photo-1533749047139-189de3cf06d3",
          description: "Copper pipe candle holders with eucalyptus",
          source: "Unsplash",
          tags: JSON.stringify(["decor", "candles", "centerpiece"]),
          positionX: 315,
          positionY: 25,
          width: 220,
          height: 220,
          createdAt: now,
          updatedAt: now
        },
        {
          MoodBoardId: industrialChicId,
          type: "note",
          content: "Color palette: Copper, charcoal, olive green, with warm amber lighting",
          description: "Urban industrial color scheme",
          tags: JSON.stringify(["colors", "palette", "urban"]),
          positionX: 25,
          positionY: 235,
          width: 250,
          height: 100,
          createdAt: now,
          updatedAt: now
        },
        {
          MoodBoardId: industrialChicId,
          type: "link",
          content: "https://www.westelm.com/shop/furniture/coffee-side-tables",
          description: "Mixed metal and wood side tables for lounge areas",
          source: "West Elm",
          tags: JSON.stringify(["furniture", "lounge", "rental"]),
          positionX: 315,
          positionY: 255,
          width: 250,
          height: 100,
          createdAt: now,
          updatedAt: now
        }
      );
    }

    // Insert all items into the MoodBoardItems table
    return queryInterface.bulkInsert('MoodBoardItems', moodBoardItems, {});
  },

  async down(queryInterface, Sequelize) {
    // Remove all entries when rolling back the seeder
    return queryInterface.bulkDelete('MoodBoardItems', null, {});
  }
};