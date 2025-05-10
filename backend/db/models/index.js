'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config/database');
const sequelize = new Sequelize(config[process.env.NODE_ENV || 'development']);

// Import models manually
const User = require('./01-user')(sequelize);
const Event = require('./02-Event')(sequelize);
const EventParty = require('./03-EventParty')(sequelize);
const Guest = require('./05-Guest')(sequelize);
const GuestAttendee = require('./06-GuestAttendee')(sequelize);
const OtherGuest = require('./07-OtherGuest')(sequelize);
const Member = require('./04-Member')(sequelize);
const Task = require('./10-Task')(sequelize);
const MoodBoard = require('./13-MoodBoard')(sequelize);
const MoodBoardItem = require('./14-MoodBoardItem')(sequelize);
const Photo = require('./16-Photo')(sequelize);
const Song = require('./15-Song')(sequelize);
const Table = require('./08-Table')(sequelize);
const Seat = require('./09-Seat')(sequelize);
const Vendor = require('./11-Vendor')(sequelize);
const VendorAttachment = require('./12-VendorAttachment')(sequelize);

// Associate models
const models = {
  sequelize,
  Sequelize,
  User,
  Event,
  EventParty,
  Guest,
  GuestAttendee,
  OtherGuest,
  Member,
  MoodBoard,
  MoodBoardItem,
  Photo,
  Seat,
  Song,
  Table,
  Task,
  Vendor,
  VendorAttachment
};

Object.values(models).forEach(model => {
  if (typeof model.associate === 'function') {
    model.associate(models);
  }
});

module.exports = models;

// 'use strict';

// const path = require('path');
// const { Sequelize, DataTypes } = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require('../../config/database.js')[env];
// const db = {};

// // Initialize sequelize instance
// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config);
// }

// // Import models directly - they're already defined with sequelize
// const User = require('./user')(sequelize, DataTypes);
// const Event = require('./Event')(sequelize, DataTypes);
// const Guest = require('./Guest')(sequelize, DataTypes);
// const Vendor = require('./Vendor')(sequelize, DataTypes);
// const VendorAttachment = require('./VendorAttachment')(sequelize, DataTypes);
// const MoodBoard = require('./MoodBoard')(sequelize, DataTypes);
// const MoodBoardItem = require('./MoodBoardItem')(sequelize, DataTypes);
// const Table = require('./Table')(sequelize, DataTypes);
// const Seat = require('./Seat')(sequelize, DataTypes);
// const EventParty = require('./EventParty')(sequelize, DataTypes);
// const Member = require('./Member')(sequelize, DataTypes);
// const Task = require('./Task')(sequelize, DataTypes);
// const Photo = require('./Photo')(sequelize, DataTypes);
// const Song = require('./Song')(sequelize, DataTypes);

// // Add models to db object
// db.User = User;
// db.Event = Event;
// db.Guest = Guest;
// db.Vendor = Vendor;
// db.VendorAttachment = VendorAttachment;
// db.MoodBoard = MoodBoard;
// db.MoodBoardItem = MoodBoardItem;
// db.Table = Table;
// db.Seat = Seat;
// db.EventParty = EventParty;
// db.Member = Member;
// db.Task = Task;
// db.Photo = Photo;
// db.Song = Song;

// // Call associate methods if they exist
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// // Define relationships (not defined in model files)
// // User - Event Association
// User.hasMany(Event);
// Event.belongsTo(User);

// // Event - Guest Association
// Event.hasMany(Guest);
// Guest.belongsTo(Event);

// // Event - Vendor Association
// Event.hasMany(Vendor);
// Vendor.belongsTo(Event);

// // Vendor - VendorAttachment Association
// Vendor.hasMany(VendorAttachment);
// VendorAttachment.belongsTo(Vendor);

// // Event - MoodBoard Association
// Event.hasMany(MoodBoard);
// MoodBoard.belongsTo(Event);

// // MoodBoard - MoodBoardItem Association
// MoodBoard.hasMany(MoodBoardItem);
// MoodBoardItem.belongsTo(MoodBoard);

// // Table - Seat Association
// Table.hasMany(Seat);
// Seat.belongsTo(Table);

// // Seat - Guest Association
// Seat.belongsTo(Guest, { constraints: false });

// // Event - EventParty Association
// Event.hasOne(EventParty);
// EventParty.belongsTo(Event);

// // EventParty - Member Association
// EventParty.hasMany(Member);
// Member.belongsTo(EventParty);

// // Member - User Association
// Member.belongsTo(User, { constraints: false });

// // Member - Task Association
// Member.hasMany(Task);
// Task.belongsTo(Member);

// // Event - Photo Association
// Event.hasMany(Photo);
// Photo.belongsTo(Event);

// // Photo - User Association (who uploaded)
// User.hasMany(Photo);
// Photo.belongsTo(User, { as: 'uploadedBy' });

// // Song - User Association
// Song.belongsTo(User, { as: 'requestedBy', constraints: false });

// // Add sequelize to db object
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// // Export only the db object - avoid exporting multiple variables
// module.exports = db;

// const path = require('path');
// const { Sequelize, DataTypes } = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const { tables } = require('../../config/db');
// const db = {};

// // const fs = require('fs');
// // const path = require('path');
// // // const Sequelize = require('sequelize');
// // const { DataTypes } = require('sequelize');
// // const { sequelize } = require('../config/db');
// // const process = require('process');
// // const basename = path.basename(__filename);
// // const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../../config/database.js')[env];
// // const db = {};

// // Initialize sequelize instance
// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config);
// }

// // Import all models
// const User = require('./user')(sequelize, DataTypes);
// const Event = require('./Event')(sequelize, DataTypes);
// const Guest = require('./Guest')(sequelize, DataTypes);
// const Vendor = require('./Vendor')(sequelize, DataTypes);
// const VendorAttachment = require('./VendorAttachment')(sequelize, DataTypes);
// const MoodBoard = require('./MoodBoard')(sequelize, DataTypes);
// const MoodBoardItem = require('./MoodBoardItem')(sequelize, DataTypes);
// const Table = require('./Table')(sequelize, DataTypes);
// const Seat = require('./Seat')(sequelize, DataTypes);
// const EventParty = require('./EventParty')(sequelize, DataTypes);
// const Member = require('./Member')(sequelize, DataTypes);
// const Task = require('./Task')(sequelize, DataTypes);
// const Photo = require('./Photo')(sequelize, DataTypes);
// const Song = require('./Song')(sequelize, DataTypes);

// // Add models to db object
// db.User = User;
// db.Event = Event;
// db.Guest = Guest;
// db.Vendor = Vendor;
// db.VendorAttachment = VendorAttachment;
// db.MoodBoard = MoodBoard;
// db.MoodBoardItem = MoodBoardItem;
// db.Table = Table;
// db.Seat = Seat;
// db.EventParty = EventParty;
// db.Member = Member;
// db.Task = Task;
// db.Photo = Photo;
// db.Song = Song;

// // Call associate methods if they exist
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// // Define relationships (not defined in model files)
// // User - Event Association
// User.hasMany(Event);
// Event.belongsTo(User);

// // Event - Guest Association
// Event.hasMany(Guest);
// Guest.belongsTo(Event);

// // Event - Vendor Association
// Event.hasMany(Vendor);
// Vendor.belongsTo(Event);

// // Vendor - VendorAttachment Association
// Vendor.hasMany(VendorAttachment);
// VendorAttachment.belongsTo(Vendor);

// // Event - MoodBoard Association
// Event.hasMany(MoodBoard);
// MoodBoard.belongsTo(Event);

// // MoodBoard - MoodBoardItem Association
// MoodBoard.hasMany(MoodBoardItem);
// MoodBoardItem.belongsTo(MoodBoard);

// // Event - SeatingChart Association
// // Event.hasOne(SeatingChart);
// // SeatingChart.belongsTo(Event);

// // SeatingChart - Table Association
// // SeatingChart.hasMany(Table);
// // Table.belongsTo(SeatingChart);

// // Table - Seat Association
// Table.hasMany(Seat);
// Seat.belongsTo(Table);

// // Seat - Guest Association
// Seat.belongsTo(Guest, { constraints: false });

// // Event - EventParty Association
// Event.hasOne(EventParty);
// EventParty.belongsTo(Event);

// // EventParty - Member Association
// EventParty.hasMany(Member);
// Member.belongsTo(EventParty);

// // Member - User Association
// Member.belongsTo(User, { constraints: false });

// // Member - Task Association
// Member.hasMany(Task);
// Task.belongsTo(Member);

// // Event - Photo Association
// Event.hasMany(Photo);
// Photo.belongsTo(Event);

// // Photo - User Association (who uploaded)
// User.hasMany(Photo);
// Photo.belongsTo(User, { as: 'uploadedBy' });

// // Photo - Like Association
// // Photo.hasMany(Like);
// // Like.belongsTo(Photo);
// // User.hasMany(Like);
// // Like.belongsTo(User);

// // Photo - Comment Association
// // Photo.hasMany(Comment);
// // Comment.belongsTo(Photo);
// // User.hasMany(Comment);
// // Comment.belongsTo(User);

// // Event - Playlist Association
// // Event.hasOne(Playlist);
// // Playlist.belongsTo(Event);

// // Playlist - Song Association
// // Playlist.hasMany(Song);
// // Song.belongsTo(Playlist);

// // Song - User Association
// Song.belongsTo(User, { as: 'requestedBy', constraints: false });

// // Sync all models with database
// const syncDatabase = async () => {
//   try {
//     if (process.env.NODE_ENV === 'development') {
//       // Use force: true only in development to drop tables
//       await sequelize.sync({ force: true });
      
//       // For production, use alter: true to make safe changes
//       await sequelize.sync({ alter: true });
//       console.log('Database synced successfully');
//     } else {
//       // In production, sync without altering structure
//       await sequelize.sync();
//       console.log('Database connected successfully');
//     }
//   } catch (error) {
//     console.error('Error syncing database:', error);
//   }
// };

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
// // module.exports = {
// //   db,
// //   sequelize,
// //   syncDatabase,
// //   User,
// //   Event,
// //   Guest,
// //   Vendor,
// //   VendorAttachment,
// //   MoodBoard,
// //   MoodBoardItem,
// //   Table,
// //   Seat,
// //   EventParty,
// //   Member,
// //   Task,
// //   Photo,
// //   Song
// // };