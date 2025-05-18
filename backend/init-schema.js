const { sequelize } = require('./db/models');

async function ensureSchema() {
  const schema = process.env.SCHEMA;

  if (!schema) {
    console.error('SCHEMA environment variable is not defined.');
    process.exit(1);
  }

  const schemas = await sequelize.showAllSchemas({ logging: false });
  const schemaNames = schemas.map(s => typeof s === 'object' ? s.schema_name : s);

  if (!schemaNames.includes(schema)) {
    console.log(`Creating schema: ${schema}`);
    await sequelize.createSchema(schema);
  } else {
    console.log(`Schema "${schema}" already exists.`);
  }

  await sequelize.close();
}

ensureSchema().catch((err) => {
  console.error('Failed to ensure schema:', err);
  process.exit(1);
});