import Sequelize from 'sequelize';
import secret from '../constants/secret.js';

console.log(secret.DB)
const sequelize = new Sequelize(
  secret.DB.NAME,
  secret.DB.USERNAME,
  secret.DB.PASSWORD,
  {
    host: secret.DB.HOST,
    port: secret.DB.PORT,
    dialect: 'postgres',
    logging: true,
  }
);

export default sequelize;
