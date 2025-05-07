'use strict';

const { Seat, Table } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Avoid duplicates
    await Seat.destroy({ where: {} });
    
    try {
      const tables = await Table.findAll();
      
      const seatsData = [];
      
      // Create number of seats based on capacity for each table
      for (const table of tables) {
        // Skip creating seats for tables that don't have seated guests
        if (table.name.includes('Gift') || table.name.includes('Cake') || 
            table.name.includes('Guest Book') || table.name.includes('Bar')) {
          continue;
        }
        
        // Create seats up to the capacity of each table
        for (let i = 1; i <= table.capacity; i++) {
          const seatData = {
            TableId: table.id, // Foreign key relationship
            seatNumber: i,
            guestName: null,
            assigned: false,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          
          // Pre-assigned guests for functionality
          if (table.name === 'Head Table' && i <= 2) {
            // Bride and groom at head table
            if (i === 1) {
              seatData.guestName = 'Emily Johnson';
              seatData.assigned = true;
            } else if (i === 2) {
              seatData.guestName = 'Michael Davis';
              seatData.assigned = true;
            }
          } else if (table.name === 'Sweetheart Table') {
            // Alternate bride and groom assignment for sweetheart table option
            if (i === 1) {
              seatData.guestName = 'Emily Johnson';
              seatData.assigned = true;
            } else if (i === 2) {
              seatData.guestName = 'Michael Davis';
              seatData.assigned = true;
            }
          } else if (table.name === 'Parents Table') {
            // Parents at the parents table
            if (i === 1) {
              seatData.guestName = 'Robert Johnson';
              seatData.assigned = true;
            } else if (i === 2) {
              seatData.guestName = 'Susan Johnson';
              seatData.assigned = true;
            } else if (i === 3) {
              seatData.guestName = 'William Davis';
              seatData.assigned = true;
            } else if (i === 4) {
              seatData.guestName = 'Patricia Davis';
              seatData.assigned = true;
            }
          } else if (table.name === 'Family Table 1') {
            // Family members assigned
            if (i === 1) {
              seatData.guestName = 'Elizabeth Smith';
              seatData.assigned = true;
            } else if (i === 2) {
              seatData.guestName = 'James Smith';
              seatData.assigned = true;
            } else if (i === 3) {
              seatData.guestName = 'Sarah Wilson';
              seatData.assigned = true;
            }
          } else if (table.name === 'Table 1') {
            // Friends at Table 1
            if (i === 1) {
              seatData.guestName = 'Jessica Taylor';
              seatData.assigned = true;
            } else if (i === 2) {
              seatData.guestName = 'Christopher Taylor';
              seatData.assigned = true;
            } else if (i === 3) {
              seatData.guestName = 'Amanda Brown';
              seatData.assigned = true;
            } else if (i === 4) {
              seatData.guestName = 'Daniel Brown';
              seatData.assigned = true;
            }
          } else if (table.name === 'Kids Table') {
            // Kids table assignments
            if (i === 1) {
              seatData.guestName = 'Lily Smith';
              seatData.assigned = true;
            } else if (i === 2) {
              seatData.guestName = 'Ethan Wilson';
              seatData.assigned = true;
            } else if (i === 3) {
              seatData.guestName = 'Emma Taylor';
              seatData.assigned = true;
            }
          } else if (table.name === 'Table 2' && i <= 3) {
            // Friends at Table 2
            if (i === 1) {
              seatData.guestName = 'Ryan Williams';
              seatData.assigned = true;
            } else if (i === 2) {
              seatData.guestName = 'Olivia Williams';
              seatData.assigned = true;
            } else if (i === 3) {
              seatData.guestName = 'Kevin Martinez';
              seatData.assigned = true;
            }
          } else if (table.name === 'Vendor Table' && i <= 3) {
            // Vendors with specific assignments
            if (i === 1) {
              seatData.guestName = 'Photographer';
              seatData.assigned = true;
            } else if (i === 2) {
              seatData.guestName = 'Videographer';
              seatData.assigned = true;
            } else if (i === 3) {
              seatData.guestName = 'Wedding Planner';
              seatData.assigned = true;
            }
          } else if (table.name === 'DJ Booth' && i === 1) {
            seatData.guestName = 'DJ';
            seatData.assigned = true;
          }
          
          seatsData.push(seatData);
        }
      }
      
      // Individual assigned seats to other tables
      // Family Table 2
      seatsData.push({
        TableId: tables.find(t => t.name === 'Family Table 2').id,
        seatNumber: 1,
        guestName: 'Thomas Johnson',
        assigned: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      seatsData.push({
        TableId: tables.find(t => t.name === 'Family Table 2').id,
        seatNumber: 2,
        guestName: 'Margaret Johnson',
        assigned: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      // Table 3
      seatsData.push({
        TableId: tables.find(t => t.name === 'Table 3').id,
        seatNumber: 1,
        guestName: 'David Miller',
        assigned: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      seatsData.push({
        TableId: tables.find(t => t.name === 'Table 3').id,
        seatNumber: 2,
        guestName: 'Jennifer Miller',
        assigned: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      // Table 4 - Coworkers
      seatsData.push({
        TableId: tables.find(t => t.name === 'Table 4').id,
        seatNumber: 1,
        guestName: 'Robert Chen',
        assigned: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      seatsData.push({
        TableId: tables.find(t => t.name === 'Table 4').id,
        seatNumber: 2,
        guestName: 'Michelle Cooper',
        assigned: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      // Bulk insert all seat data
      await Seat.bulkCreate(seatsData);
      
      console.log('Seats seeded successfully');
    } catch (error) {
      console.error('Error seeding seats:', error);
    }
  },
  
  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Seats';
    // Remove all seat data when reverting the seed
    await Seat.destroy({ where: {} });
    console.log('Seats seed reverted');
  }
};