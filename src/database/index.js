import { Sequelize } from 'sequelize';
import config from '../config.js';

const sequelize = new Sequelize(config.dbSchema, config.dbUser, config.dbPwd, {
  host: config.dbServer,
  dialect: 'mysql',
  port: config.dbPort,
});

export default sequelize;

