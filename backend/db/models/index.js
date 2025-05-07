'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/database.js')[env];
const db = {};

// Initialize sequelize instance
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Import all models
const User = require('./user');
const Event = require('./Event');
const Guest = require('./Guest');
const Vendor = require('./Vendor');
const VendorAttachment = require('./VendorAttachment');
const MoodBoard = require('./MoodBoard');
const MoodBoardItem = require('./MoodBoardItem');
const Table = require('./Table');
const Seat = require('./Seat');
const EventParty = require('./EventParty');
const Member = require('./Member');
const Task = require('./Task');
const Photo = require('./Photo');
const Song = require('./Song');

// Add models to db object
db.User = User;
db.Event = Event;
db.Guest = Guest;
db.Vendor = Vendor;
db.VendorAttachment = VendorAttachment;
db.MoodBoard = MoodBoard;
db.MoodBoardItem = MoodBoardItem;
db.Table = Table;
db.Seat = Seat;
db.EventParty = EventParty;
db.Member = Member;
db.Task = Task;
db.Photo = Photo;
db.Song = Song;

// Call associate methods if they exist
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Define relationships if needed (not defined in model files)
// User - Event Association
User.hasMany(Event);
Event.belongsTo(User);

// Event - Guest Association
Event.hasMany(Guest);
Guest.belongsTo(Event);

// Event - Vendor Association
Event.hasMany(Vendor);
Vendor.belongsTo(Event);

// Vendor - VendorAttachment Association
Vendor.hasMany(VendorAttachment);
VendorAttachment.belongsTo(Vendor);

// Event - MoodBoard Association
Event.hasMany(MoodBoard);
MoodBoard.belongsTo(Event);

// MoodBoard - MoodBoardItem Association
MoodBoard.hasMany(MoodBoardItem);
MoodBoardItem.belongsTo(MoodBoard);

// Event - SeatingChart Association
// Event.hasOne(SeatingChart);
// SeatingChart.belongsTo(Event);

// SeatingChart - Table Association
// SeatingChart.hasMany(Table);
// Table.belongsTo(SeatingChart);

// Table - Seat Association
Table.hasMany(Seat);
Seat.belongsTo(Table);

// Seat - Guest Association (optional)
Seat.belongsTo(Guest, { constraints: false });

// Event - EventParty Association
Event.hasOne(EventParty);
EventParty.belongsTo(Event);

// EventParty - Member Association
EventParty.hasMany(Member);
Member.belongsTo(EventParty);

// Member - User Association (optional)
Member.belongsTo(User, { constraints: false });

// Member - Task Association
Member.hasMany(Task);
Task.belongsTo(Member);

// Event - Photo Association
Event.hasMany(Photo);
Photo.belongsTo(Event);

// Photo - User Association (who uploaded)
User.hasMany(Photo);
Photo.belongsTo(User, { as: 'uploadedBy' });

// Photo - Like Association
// Photo.hasMany(Like);
// Like.belongsTo(Photo);
// User.hasMany(Like);
// Like.belongsTo(User);

// Photo - Comment Association
// Photo.hasMany(Comment);
// Comment.belongsTo(Photo);
// User.hasMany(Comment);
// Comment.belongsTo(User);

// Event - Playlist Association
// Event.hasOne(Playlist);
// Playlist.belongsTo(Event);

// Playlist - Song Association
// Playlist.hasMany(Song);
// Song.belongsTo(Playlist);

// Song - User Association (optional)
Song.belongsTo(User, { as: 'requestedBy', constraints: false });

// Sync all models with database
const syncDatabase = async () => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Use force: true only in development to drop tables
      // await sequelize.sync({ force: true });
      
      // For production, use alter: true to make safe changes
      await sequelize.sync({ alter: true });
      console.log('Database synced successfully');
    } else {
      // In production, just sync without altering structure
      await sequelize.sync();
      console.log('Database connected successfully');
    }
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = {
  db,
  sequelize,
  syncDatabase,
  User,
  Event,
  Guest,
  Vendor,
  VendorAttachment,
  MoodBoard,
  MoodBoardItem,
  Table,
  Seat,
  EventParty,
  Member,
  Task,
  Photo,
  Song
};