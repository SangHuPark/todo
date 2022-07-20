const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const User = require('./user.js');
const Todo = require('./todo.js');

const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config, /*{
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    timezone: "Asia/Seoul",
    dialectOptions: {
      charset: "utf8mb4",
      dateStrings: true,
      typeCast: true,
    },
  }*/);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Todo = Todo;

User.init(sequelize);
Todo.init(sequelize);

User.associate(db);
Todo.associate(db);

module.exports = db;