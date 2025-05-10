'use strict';

const { Sequelize } = require('sequelize');
const config = require('../../config/database');
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Initialize Sequelize instance
let sequelize;

if (dbConfig.use_env_variable) {
  // Use DATABASE_URL in production
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
} else {
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig
  );
}

// Import models
const User = require('./01-user')(sequelize);
const Event = require('./02-Event')(sequelize);
const EventParty = require('./03-EventParty')(sequelize);
const Member = require('./04-Member')(sequelize);
const Guest = require('./05-Guest')(sequelize);
const GuestAttendee = require('./06-GuestAttendee')(sequelize);
const OtherGuest = require('./07-OtherGuest')(sequelize);
const Table = require('./08-Table')(sequelize);
const Seat = require('./09-Seat')(sequelize);
const Task = require('./10-Task')(sequelize);
const Vendor = require('./11-Vendor')(sequelize);
const VendorAttachment = require('./12-VendorAttachment')(sequelize);
const MoodBoard = require('./13-MoodBoard')(sequelize);
const MoodBoardItem = require('./14-MoodBoardItem')(sequelize);
const Song = require('./15-Song')(sequelize);
const Photo = require('./16-Photo')(sequelize);

// Bundle models
const models = {
  sequelize,
  Sequelize,
  User,
  Event,
  EventParty,
  Member,
  Guest,
  GuestAttendee,
  OtherGuest,
  Table,
  Seat,
  Task,
  Vendor,
  VendorAttachment,
  MoodBoard,
  MoodBoardItem,
  Song,
  Photo
};

// Run all associations
Object.values(models).forEach((model) => {
  if (typeof model.associate === 'function') {
    model.associate(models);
  }
});

// Optional sync helper (safer with alter for development)
const syncDatabase = () => sequelize.sync({ alter: true });

module.exports = {
  ...models,
  syncDatabase
};

// 'use strict';

// const { Sequelize } = require('sequelize');
// const config = require('../../config/database');
// const sequelize = new Sequelize(config[process.env.NODE_ENV || 'development']);

// const syncDatabase = () => sequelize.sync(); // ✅ added

// // Import models
// const User = require('./01-user')(sequelize);
// const Event = require('./02-Event')(sequelize);
// const EventParty = require('./03-EventParty')(sequelize);
// const Guest = require('./05-Guest')(sequelize);
// const GuestAttendee = require('./06-GuestAttendee')(sequelize);
// const OtherGuest = require('./07-OtherGuest')(sequelize);
// const Member = require('./04-Member')(sequelize);
// const Task = require('./10-Task')(sequelize);
// const MoodBoard = require('./13-MoodBoard')(sequelize);
// const MoodBoardItem = require('./14-MoodBoardItem')(sequelize);
// const Photo = require('./16-Photo')(sequelize);
// const Song = require('./15-Song')(sequelize);
// const Table = require('./08-Table')(sequelize);
// const Seat = require('./09-Seat')(sequelize);
// const Vendor = require('./11-Vendor')(sequelize);
// const VendorAttachment = require('./12-VendorAttachment')(sequelize);

// // Associate models
// const models = {
//   sequelize,
//   Sequelize,
//   syncDatabase, // ✅ now safe to export
//   User,
//   Event,
//   EventParty,
//   Guest,
//   GuestAttendee,
//   OtherGuest,
//   Member,
//   MoodBoard,
//   MoodBoardItem,
//   Photo,
//   Seat,
//   Song,
//   Table,
//   Task,
//   Vendor,
//   VendorAttachment
// };

// Object.values(models).forEach(model => {
//   if (typeof model.associate === 'function') {
//     model.associate(models);
//   }
// });

// module.exports = models;