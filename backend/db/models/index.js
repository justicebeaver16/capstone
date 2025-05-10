'use strict';

const { Sequelize } = require('sequelize');
const config = require('../../config/database');
const sequelize = new Sequelize(config[process.env.NODE_ENV || 'development']);

const syncDatabase = () => sequelize.sync(); // ✅ added

// Import models
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
  syncDatabase, // ✅ now safe to export
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