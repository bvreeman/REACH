const Sequelize = require('sequelize');
const connection;

if (config.use_env_variable) {
  const sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {

const sequelize = new Sequelize('contacts_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

}

connection.connect();
module.exports = sequelize;
