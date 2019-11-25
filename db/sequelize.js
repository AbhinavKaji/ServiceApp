const Sequelize = require("sequelize");
const {
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_PORT,
  DB_NAME
} = require("../config");
// console.log(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_NAME);

// uncomment for  localhost
var pg = require("pg");
pg.defaults.ssl = true;
//
let config = null;
let host = null;
let dialect = null;
let username = null;
let password = null;
let database = null;
let port = null;
dialect = "postgres";
host = DB_HOST;
username = DB_USERNAME;
password = DB_PASSWORD;
database = DB_NAME;
port = DB_PORT;

//DB CONNECTION
const sequelize = new Sequelize(database, username, password, {
  host: host,
  port: port,
  dialect: dialect,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
module.exports = sequelize;
