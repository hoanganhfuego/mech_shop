const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "anh753918426",
  database: "mech_shop",
  port: "3308"
});

module.exports = db;
