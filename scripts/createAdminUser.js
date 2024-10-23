const argon2 = require('argon2');
const db = require('../config/dbConfig');

async function createAdminUser(username, password) {
  try {
    const hashedPassword = await argon2.hash(password);
    const query = 'INSERT INTO admin_users (username, password) VALUES (?, ?)';
    
    const [result] = await db.promise().query(query, [username, hashedPassword]);
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    db.end();
  }
}

// Usage: node scripts/createAdminUser.js <username> <password>
const [,, username, password] = process.argv;

if (username && password) {
  createAdminUser(username, password);
} else {
  console.log('Please provide a username and password');
}