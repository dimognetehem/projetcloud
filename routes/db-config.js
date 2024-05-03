const mysql = require("mysql2");

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.PASSWORD || '',
    database: process.env.DATABASE || 'projetcloud',
    port: 3306
});

module.exports = db;