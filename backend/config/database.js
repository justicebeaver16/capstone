module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './db/development.sqlite',
    seederStorage: 'sequelize',
    logging: false,
    logQueryParameters: true,
    typeValidation: true
  },
  test: {
    dialect: 'sqlite',
    // storage: './db/test.sqlite',
    storage: process.env.DB_FILE || './db/development.sqlite',
    seederStorage: 'sequelize',
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    define: {
  schema: process.env.SCHEMA && process.env.SCHEMA.trim() !== '' ? process.env.SCHEMA : 'public'
}
    // define: {
    //   schema: process.env.SCHEMA || 'public'
    // }
  }
};