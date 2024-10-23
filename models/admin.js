// models/admin.js
const db = require('../config/dbConfig'); // Replace with your database connection

exports.findByEmail = (email) => {
    return db.execute('SELECT * FROM admin_users WHERE email = ?', [email]); // Check the table name
  };
  
