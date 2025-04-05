// models/index.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Sequelize from 'sequelize';
import sequelize from '../config/database.js'; // ✅ Import your configured instance

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);

const db = {};

const files = fs.readdirSync(__dirname).filter((file) => {
  return (
    file !== basename &&
    file.endsWith('.js') &&
    !file.startsWith('.') &&
    !file.includes('.test.') &&
    !file.includes('.spec.')
  );
});

for (const file of files) {
  const { default: defineModel } = await import(path.join(__dirname, file));
  const model = defineModel(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

Object.values(db).forEach((model) => {
  if (model.associate) model.associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
