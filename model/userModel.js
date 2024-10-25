const db = require('../config/dbcon'); 
const bcrypt = require('bcrypt');

// Create a new user
const createUser = async (name, email, phone, password) => {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const [result] = await db.query(
        'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
        [name, email, phone, hashedPassword]
    );
    return result.insertId; // Return the ID of the newly created user
};

// Find a user by email
const findByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0]; // Return the first user found
};

module.exports = {
    createUser,
    findByEmail
};
