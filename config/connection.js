const Sequelize = require('sequelize');
const connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
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
