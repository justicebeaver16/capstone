'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/database.js')[env];
const db = {};
const sequelize = require('../config/db');
const User = require('./User');
const Event = require('./Event');
const Guest = require('./Guest');
const Vendor = require('./Vendor');
const VendorAttachment = require('./VendorAttachment');
const MoodBoard = require('./MoodBoard');
const MoodBoardItem = require('./MoodBoardItem');
const SeatingChart = require('./SeatingChart');
const Table = require('./Table');
const Seat = require('./Seat');
const EventParty = require('./EventParty');
const Member = require('./Member');
const Task = require('./Task');
const Photo = require('./Photo');
const Like = require('./Like');
const Comment = require('./Comment');
const Playlist = require('./Playlist');
const Song = require('./Song');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Define relationships
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
Event.hasOne(SeatingChart);
SeatingChart.belongsTo(Event);

// SeatingChart - Table Association
SeatingChart.hasMany(Table);
Table.belongsTo(SeatingChart);

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
Photo.hasMany(Like);
Like.belongsTo(Photo);
User.hasMany(Like);
Like.belongsTo(User);

// Photo - Comment Association
Photo.hasMany(Comment);
Comment.belongsTo(Photo);
User.hasMany(Comment);
Comment.belongsTo(User);

// Event - Playlist Association
Event.hasOne(Playlist);
Playlist.belongsTo(Event);

// Playlist - Song Association
Playlist.hasMany(Song);
Song.belongsTo(Playlist);

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