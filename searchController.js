const db = require('../config/dbConfig');

exports.searchProducts = (req, res) => {
    const { query } = req.query;
    const searchQuery = '%' + query + '%';
    const sql = 'SELECT * FROM products WHERE name LIKE ? OR description LIKE ?';
    
    db.query(sql, [searchQuery, searchQuery], (err, results) => {
    if (err) {
    console.error(err);
    return res.status(500).send('Error searching products');
    }
    
    if (results.length > 0) {
        return res.redirect('product/' + results[0].id);
    } else {
    return res.render('search-results', { query, results: [] });
}
});
};

/* exports.getProductById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM products WHERE id = ?';

  db.query(sql, [id], (err, results) => {
    console.error(err); // Log error message
    if (err) {
      return res.status(500).send('Error retrieving product');
    }

    const product = results[0];
    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.render('search-results', { product });
  });
}; */

