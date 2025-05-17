const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./database.js')[env];

let sequelize;

if (config.use_env_variable) {
  // Use DATABASE_URL for production (Render)
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else if (config.dialect === 'sqlite') {
  // Handle SQLite specifically for development/test
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: config.storage,
    logging: config.logging,
    seederStorage: config.seederStorage
  });
} else {
  // Default fallback for other DBs like local Postgres
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

module.exports = sequelize;

// const { Sequelize } = require('sequelize');
// const env = process.env.NODE_ENV || 'development';
// const config = require('./database.js')[env];

// let sequelize;

// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database || undefined,
//     config.username || undefined,
//     config.password || undefined,
//     config
//   );
// }

// module.exports = sequelize;