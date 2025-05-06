const { Photo } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Avoid duplicates
    await Photo.destroy({ where: {} });
    
    const photosData = [
      // Ceremony photos
      {
        title: 'Beautiful Ceremony',
        description: 'Emily and Michael exchanging vows under the floral arch',
        imageUrl: 'https://wedding-app-photos.s3.amazonaws.com/ceremony-vows-1.jpg',
        thumbnailUrl: 'https://wedding-app-photos.s3.amazonaws.com/thumbnails/ceremony-vows-1-thumb.jpg',
        tags: ['ceremony', 'couple', 'vows', 'arch', 'emotional'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'First Kiss as Newlyweds',
        description: 'The magical moment of their first kiss as a married couple',
        imageUrl: 'https://wedding-app-photos.s3.amazonaws.com/ceremony-kiss-1.jpg',
        thumbnailUrl: 'https://wedding-app-photos.s3.amazonaws.com/thumbnails/ceremony-kiss-1-thumb.jpg',
        tags: ['ceremony', 'couple', 'kiss', 'newlyweds'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Walking Down the Aisle',
        description: 'Emily walking down the aisle with her father',
        imageUrl: 'https://wedding-app-photos.s3.amazonaws.com/ceremony-aisle-walk.jpg',
        thumbnailUrl: 'https://wedding-app-photos.s3.amazonaws.com/thumbnails/ceremony-aisle-walk-thumb.jpg',
        tags: ['ceremony', 'bride', 'father', 'aisle', 'entrance'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Reception venue
      {
        title: 'Beautiful Reception Hall',
        description: 'The reception venue before everyone arrived - stunning decorations!',
        imageUrl: 'https://wedding-app-photos.s3.amazonaws.com/reception-venue-1.jpg',
        thumbnailUrl: 'https://wedding-app-photos.s3.amazonaws.com/thumbnails/reception-venue-1-thumb.jpg',
        tags: ['reception', 'venue', 'decorations', 'empty'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Table Centerpieces',
        description: 'Gorgeous floral centerpieces with candles on each table',
        imageUrl: 'https://wedding-app-photos.s3.amazonaws.com/reception-centerpiece-1.jpg',
        thumbnailUrl: 'https://wedding-app-photos.s3.amazonaws.com/thumbnails/reception-centerpiece-1-thumb.jpg',
        tags: ['reception', 'decor', 'flowers', 'centerpiece', 'table'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Food and cake
      {
        title: 'Wedding Cake',
        description: 'Three-tier wedding cake with beautiful floral decorations',
        imageUrl: 'https://wedding-app-photos.s3.amazonaws.com/reception-cake-1.jpg',
        thumbnailUrl: 'https://wedding-app-photos.s3.amazonaws.com/thumbnails/reception-cake-1-thumb.jpg',
        tags: ['reception', 'cake', 'dessert', 'food'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Dinner Plate',
        description: 'My delicious dinner - steak with roasted vegetables',
        imageUrl: 'https://wedding-app-photos.s3.amazonaws.com/reception-food-1.jpg',
        thumbnailUrl: 'https://wedding-app-photos.s3.amazonaws.com/thumbnails/reception-food-1-thumb.jpg',
        tags: ['reception', 'food', 'dinner', 'plate'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Signature Cocktails',
        description: 'His and hers specialty cocktails at the open bar',
        imageUrl: 'https://wedding-app-photos.s3.amazonaws.com/reception-drinks-1.jpg',
        thumbnailUrl: 'https://wedding-app-photos.s3.amazonaws.com/thumbnails/reception-drinks-1-thumb.jpg',
        tags: ['reception', 'drinks', 'cocktails', 'bar'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Dancing and celebration
      {
        title: 'First Dance',
        description: 'Emily and Michael\'s romantic first dance',
        imageUrl: 'https://wedding-app-photos.s3.amazonaws.com/reception-first-dance-1.jpg',
        thumbnailUrl: 'https://wedding-app-photos.s3.amazonaws.com/thumbnails/reception-first-dance-1-thumb.jpg',
        tags: ['reception', 'couple', 'dance', 'romantic', 'first dance'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Father-Daughter Dance',
        description: 'Emily and her father sharing a special dance',
        imageUrl: 'https://wedding-app-photos.s3.amazonaws.com/reception-father-dance-1.jpg',
        thumbnailUrl: 'https://wedding-app-photos.s3.amazonaws.com/thumbnails/reception-father-dance-1-thumb.jpg',
        tags: ['reception', 'dance', 'father', 'bride', 'emotional'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Dance Floor Fun',
        description: 'Everyone having a blast on the dance floor!',
        imageUrl: 'https://wedding-app-photos.s3.amazonaws.com/reception-dancing-1.jpg',
        thumbnailUrl: 'https://wedding-app-photos.s3.amazonaws.com/thumbnails/reception-dancing-1-thumb.jpg',
        tags: ['reception', 'dancing', 'fun', 'group', 'party'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Group photos
      {
        title: 'Our Table',
        description: 'Everyone at Table 2 - college friends reunited!',
        imageUrl: 'https://wedding-app-photos.s3.amazonaws.com/reception-table-friends-1.jpg',
        thumbnailUrl: 'https://wedding-app-photos.s3.amazonaws.com/thumbnails/reception-table-friends-1-thumb.jpg',
        tags: ['reception', 'friends', 'table', 'group', 'selfie'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Friends Selfie',
        description: 'Quick selfie with Jessica and Chris before the ceremony',
        imageUrl: 'https://wedding-app-photos.s3.amazonaws.com/pre-ceremony-friends-1.jpg',
        thumbnailUrl: 'https://wedding-app-photos.s3.amazonaws.com/thumbnails/pre-ceremony-friends-1-thumb.jpg',
        tags: ['pre-ceremony', 'friends', 'selfie', 'guests'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Details and decor
      {
        title: 'Beautiful Bouquet',
        description: 'Emily\'s stunning bouquet with roses and peonies',
        imageUrl: 'https://wedding-app-photos.s3.amazonaws.com/detail-bouquet-1.jpg',
        thumbnailUrl: 'https://wedding-app-photos.s3.amazonaws.com/thumbnails/detail-bouquet-1-thumb.jpg',
        tags: ['detail', 'flowers', 'bouquet', 'bride'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Wedding Rings',
        description: 'Close-up of their beautiful wedding rings on the ring pillow',
        imageUrl: 'https://wedding-app-photos.s3.amazonaws.com/detail-rings-1.jpg',
        thumbnailUrl: 'https://wedding-app-photos.s3.amazonaws.com/thumbnails/detail-rings-1-thumb.jpg',
        tags: ['detail', 'rings', 'jewelry', 'ceremony'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Wedding Favors',
        description: 'Cute customized champagne bottles as wedding favors',
        imageUrl: 'https://wedding-app-photos.s3.amazonaws.com/detail-favors-1.jpg',
        thumbnailUrl: 'https://wedding-app-photos.s3.amazonaws.com/thumbnails/detail-favors-1-thumb.jpg',
        tags: ['detail', 'favors', 'gifts', 'champagne'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Venue and setting
      {
        title: 'Garden Venue',
        description: 'The beautiful garden where the ceremony took place',
        imageUrl: 'https://wedding-app-photos.s3.amazonaws.com/venue-garden-1.jpg',
        thumbnailUrl: 'https://wedding-app-photos.s3.amazonaws.com/thumbnails/venue-garden-1-thumb.jpg',
        tags: ['venue', 'garden', 'outdoor', 'ceremony'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Sunset at Venue',
        description: 'Gorgeous sunset over the venue - perfect timing!',
        imageUrl: 'https://wedding-app-photos.s3.amazonaws.com/venue-sunset-1.jpg',
        thumbnailUrl: 'https://wedding-app-photos.s3.amazonaws.com/thumbnails/venue-sunset-1-thumb.jpg',
        tags: ['venue', 'sunset', 'landscape', 'golden hour'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Special moments
      {
        title: 'Cake Cutting',
        description: 'Emily and Michael cutting their wedding cake together',
        imageUrl: 'https://wedding-app-photos.s3.amazonaws.com/moment-cake-cutting-1.jpg',
        thumbnailUrl: 'https://wedding-app-photos.s3.amazonaws.com/thumbnails/moment-cake-cutting-1-thumb.jpg',
        tags: ['reception', 'cake', 'couple', 'tradition'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Bouquet Toss',
        description: 'Emily tossing her bouquet to the single ladies',
        imageUrl: 'https://wedding-app-photos.s3.amazonaws.com/moment-bouquet-toss-1.jpg',
        thumbnailUrl: 'https://wedding-app-photos.s3.amazonaws.com/thumbnails/moment-bouquet-toss-1-thumb.jpg',
        tags: ['reception', 'bouquet', 'tradition', 'fun'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Grand Exit',
        description: 'The happy couple leaving through a sparkler tunnel',
        imageUrl: 'https://wedding-app-photos.s3.amazonaws.com/moment-exit-1.jpg',
        thumbnailUrl: 'https://wedding-app-photos.s3.amazonaws.com/thumbnails/moment-exit-1-thumb.jpg',
        tags: ['exit', 'couple', 'sparklers', 'night', 'end'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Candid moments
      {
        title: 'Laughing During Speeches',
        description: 'Everyone laughing during the best man\'s speech',
        imageUrl: 'https://wedding-app-photos.s3.amazonaws.com/candid-speeches-1.jpg',
        thumbnailUrl: 'https://wedding-app-photos.s3.amazonaws.com/thumbnails/candid-speeches-1-thumb.jpg',
        tags: ['reception', 'speeches', 'laughter', 'candid'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Emotional Moment',
        description: 'Emily\'s mom tearing up during the ceremony',
        imageUrl: 'https://wedding-app-photos.s3.amazonaws.com/candid-emotional-1.jpg',
        thumbnailUrl: 'https://wedding-app-photos.s3.amazonaws.com/thumbnails/candid-emotional-1-thumb.jpg',
        tags: ['ceremony', 'emotional', 'family', 'candid', 'tears'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Kids Dancing',
        description: 'The flower girl and ring bearer showing off their dance moves',
        imageUrl: 'https://wedding-app-photos.s3.amazonaws.com/candid-kids-1.jpg',
        thumbnailUrl: 'https://wedding-app-photos.s3.amazonaws.com/thumbnails/candid-kids-1-thumb.jpg',
        tags: ['reception', 'kids', 'dancing', 'cute', 'candid'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    // Bulk insert all photo data
    await Photo.bulkCreate(photosData);
    
    console.log('Photos seeded successfully');
  },
  
  down: async (queryInterface, Sequelize) => {
    // Remove all photo data when reverting the seed
    await Photo.destroy({ where: {} });
    console.log('Photos seed reverted');
  }
};