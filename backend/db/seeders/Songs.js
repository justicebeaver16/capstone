const { Song } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Avoid duplicates
    await Song.destroy({ where: {} });
    
    // Wedding song requests data
    const songsData = [
      // Slow dance songs
      {
        title: "Can't Help Falling in Love",
        artist: "Elvis Presley",
        requestedByName: "Sarah Johnson",
        requestType: "slow-dance",
        approved: true,
        notes: "For my grandparents who danced to this at their wedding",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "At Last",
        artist: "Etta James",
        requestedByName: "Michael Thompson",
        requestType: "slow-dance",
        approved: true,
        notes: "My parents' favorite song",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Perfect",
        artist: "Ed Sheeran",
        requestedByName: "Emma Wilson",
        requestType: "slow-dance",
        approved: true,
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "All of Me",
        artist: "John Legend",
        requestedByName: "Jessica Parker",
        requestType: "slow-dance",
        approved: true,
        notes: "This song always makes me tear up!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Dance floor songs
      {
        title: "Uptown Funk",
        artist: "Mark Ronson ft. Bruno Mars",
        requestedByName: "David Miller",
        requestType: "dance-floor",
        approved: true,
        notes: "Gets everyone dancing!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Dancing Queen",
        artist: "ABBA",
        requestedByName: "Lisa Garcia",
        requestType: "dance-floor",
        approved: true,
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "I Wanna Dance with Somebody",
        artist: "Whitney Houston",
        requestedByName: "Robert Chen",
        requestType: "dance-floor",
        approved: true,
        notes: "Classic!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Shut Up and Dance",
        artist: "Walk The Moon",
        requestedByName: "Alex Rodriguez",
        requestType: "dance-floor",
        approved: true,
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Dynamite",
        artist: "BTS",
        requestedByName: "Jennifer Kim",
        requestType: "dance-floor",
        approved: true,
        notes: "My favorite song right now!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // General songs
      {
        title: "Sweet Caroline",
        artist: "Neil Diamond",
        requestedByName: "Chris Johnson",
        requestType: "general",
        approved: true,
        notes: "Everyone knows this one",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Don't Stop Believin'",
        artist: "Journey",
        requestedByName: "Patricia Martinez",
        requestType: "general",
        approved: true,
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Bohemian Rhapsody",
        artist: "Queen",
        requestedByName: "Thomas Wright",
        requestType: "general",
        approved: false,
        notes: "Too long for the reception",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Slow dance songs
      {
        title: "A Thousand Years",
        artist: "Christina Perri",
        requestedByName: "Amanda Lee",
        requestType: "slow-dance",
        approved: true,
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Thinking Out Loud",
        artist: "Ed Sheeran",
        requestedByName: "Kevin Brown",
        requestType: "slow-dance",
        approved: true,
        notes: "For my wife and I",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Dance floor songs
      {
        title: "Yeah!",
        artist: "Usher",
        requestedByName: "Brandon Scott",
        requestType: "dance-floor",
        approved: true,
        notes: "Let's get this party started!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Mr. Brightside",
        artist: "The Killers",
        requestedByName: "Olivia Williams",
        requestType: "dance-floor",
        approved: true,
        notes: "College memories!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "WAP",
        artist: "Cardi B ft. Megan Thee Stallion",
        requestedByName: "Tyler Jones",
        requestType: "dance-floor",
        approved: false,
        notes: "Not appropriate for this event",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // General songs
      {
        title: "Billie Jean",
        artist: "Michael Jackson",
        requestedByName: "Sophia Taylor",
        requestType: "general",
        approved: true,
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Higher Love",
        artist: "Kygo & Whitney Houston",
        requestedByName: "Daniel White",
        requestType: "general",
        approved: true,
        notes: "Great remix!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Love Story",
        artist: "Taylor Swift",
        requestedByName: "Megan Clarke",
        requestType: "general",
        approved: true,
        notes: "My all-time favorite",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "September",
        artist: "Earth, Wind & Fire",
        requestedByName: "Ryan Murphy",
        requestType: "general",
        approved: true,
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Shape of You",
        artist: "Ed Sheeran",
        requestedByName: "Michelle Cooper",
        requestType: "dance-floor",
        approved: true,
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Hey Ya!",
        artist: "Outkast",
        requestedByName: "James Wilson",
        requestType: "dance-floor",
        approved: true,
        notes: "Always a crowd pleaser",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Baby Got Back",
        artist: "Sir Mix-a-Lot",
        requestedByName: "Taylor Davis",
        requestType: "dance-floor",
        approved: false,
        notes: "Not suitable for all ages at the reception",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    // Bulk insert all song data
    await Song.bulkCreate(songsData);
    
    console.log('Songs seeded successfully');
  },
  
  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Songs';
    // Remove all song data when reverting the seed
    await Song.destroy({ where: {} });
    console.log('Songs seed reverted');
  }
};