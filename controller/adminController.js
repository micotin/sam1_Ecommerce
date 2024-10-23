const db = require('../config/dbConfig');

exports.getAllAdmins = (req, res) => {
  const query = 'SELECT * FROM admin_users';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching admins:', err);
      res.status(500).send('Error fetching admins');
      return;
    }
    res.render('admin', { title: 'Admin View', admin: results });
  });
};
