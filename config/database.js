import Sequelize from 'sequelize';
import { secrets } from '../constants/secrets.js';

const sequelize = new Sequelize(
  secrets.DB.NAME,
  secrets.DB.USERNAME,
  secrets.DB.PASSWORD,
  {
    host: secrets.DB.HOST,
    port: secrets.DB.PORT,
    dialect: 'postgres',
    logging: false,
  }
);

export default sequelize;
