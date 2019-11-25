const Sequelize = require("sequelize");

// uncomment for  localhost
var pg = require("pg");
pg.defaults.ssl = false;
//
let username= "postgres";
let password= "postgres";
let database= "service-app";
let host= "127.0.0.1";
let dialect = "postgres";
let port= "5432"


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
