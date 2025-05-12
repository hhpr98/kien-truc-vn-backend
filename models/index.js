'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const dotenv = require('dotenv');
dotenv.config();
const env = process.env.NODE_ENV || 'production';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// Squelize logger
const logFile = fs.createWriteStream(path.join(__dirname, '../app.log'), { flags: 'a' });
const getTimestamp = () => new Date().toISOString();
const sequelizeLogger = (msg) => {
  const message = `[${getTimestamp()}] [SEQUELIZE] ${msg}\n`;
  logFile.write(message);
  process.stdout.write(message);
};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {...config, logging: sequelizeLogger });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {...config, logging: sequelizeLogger });
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
