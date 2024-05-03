const mysql = require("mysql2");

const db = mysql.createConnection({
    host: 'mysql',
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 3306
});

module.exports = db;