const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./database.js')[env];

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database || undefined,
    config.username || undefined,
    config.password || undefined,
    config
  );
}

module.exports = sequelize;

// const { Sequelize } = require('sequelize');
// const env = process.env.NODE_ENV || 'development';
// const config = require('./database.js')[env];

// const tables = new Sequelize(
//   config.database, 
//   config.username, 
//   config.password, 
//   config
// );

// module.exports = tables;

// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// let sequelize;
// if (process.env.NODE_ENV === 'production') {
//   sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres',
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false
//       }
//     },
//     define: {
//       schema: process.env.SCHEMA
//     }
//   });
// } else {
//   sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './db/development.sqlite',
//     logging: console.log
//   });
// }

// module.exports = sequelize;