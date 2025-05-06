const { Table } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Avoid duplicates
    await Table.destroy({ where: {} });
    
    // Wedding reception tables data
    const tablesData = [
      // Main tables
      {
        name: 'Head Table',
        capacity: 10,
        tableType: 'rectangular',
        positionX: 400,
        positionY: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Parents Table',
        capacity: 8,
        tableType: 'round',
        positionX: 200,
        positionY: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Guest tables - Round
      {
        name: 'Table 1',
        capacity: 8,
        tableType: 'round',
        positionX: 150,
        positionY: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Table 2',
        capacity: 8,
        tableType: 'round',
        positionX: 300,
        positionY: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Table 3',
        capacity: 8,
        tableType: 'round',
        positionX: 450,
        positionY: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Table 4',
        capacity: 8,
        tableType: 'round',
        positionX: 600,
        positionY: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Large family tables
      {
        name: 'Family Table 1',
        capacity: 10,
        tableType: 'round',
        positionX: 200,
        positionY: 450,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Family Table 2',
        capacity: 10,
        tableType: 'round',
        positionX: 500,
        positionY: 450,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Kids table
      {
        name: 'Kids Table',
        capacity: 6,
        tableType: 'rectangular',
        positionX: 350,
        positionY: 550,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Cocktail hour high-tops
      {
        name: 'Cocktail 1',
        capacity: 4,
        tableType: 'round',
        positionX: 100,
        positionY: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cocktail 2',
        capacity: 4,
        tableType: 'round',
        positionX: 200,
        positionY: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Gift table
      {
        name: 'Gift Table',
        capacity: 0,
        tableType: 'rectangular',
        positionX: 700,
        positionY: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Guest book table
      {
        name: 'Guest Book',
        capacity: 0,
        tableType: 'rectangular',
        positionX: 50,
        positionY: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Cake table
      {
        name: 'Cake Table',
        capacity: 0,
        tableType: 'round',
        positionX: 650,
        positionY: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Custom shaped sweetheart table
      {
        name: 'Sweetheart Table',
        capacity: 2,
        tableType: 'custom',
        positionX: 400,
        positionY: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Additional round tables
      {
        name: 'Table 5',
        capacity: 8,
        tableType: 'round',
        positionX: 150,
        positionY: 600,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Table 6',
        capacity: 8,
        tableType: 'round',
        positionX: 550,
        positionY: 600,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Vendor tables
      {
        name: 'Vendor Table',
        capacity: 6,
        tableType: 'rectangular',
        positionX: 800,
        positionY: 500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // DJ table
      {
        name: 'DJ Booth',
        capacity: 2,
        tableType: 'custom',
        positionX: 800,
        positionY: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Bar tables
      {
        name: 'Bar 1',
        capacity: 0,
        tableType: 'rectangular',
        positionX: 900,
        positionY: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    // Bulk insert all table data
    await Table.bulkCreate(tablesData);
    
    console.log('Tables seeded successfully');
  },
  
  down: async (queryInterface, Sequelize) => {
    // Remove all table data when reverting the seed
    await Table.destroy({ where: {} });
    console.log('Tables seed reverted');
  }
};