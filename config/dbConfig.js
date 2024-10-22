const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sam1_flower_shop' 
});

console.log('MySQL connection pool created.');

module.exports = db;
