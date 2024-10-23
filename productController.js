const db = require('../config/dbConfig');

exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 9; // Number of products per page
    const offset = (page - 1) * limit;

    // Query to count total products
    const [countResult] = await db.query('SELECT COUNT(*) as total FROM products');
    const totalProducts = countResult[0].total;
    const totalPages = Math.ceil(totalProducts / limit);

    // Query to fetch products with pagination
    const [products] = await db.query('SELECT * FROM products LIMIT ? OFFSET ?', [limit, offset]);

    // Iterate over each product and handle the price conversion
    products.forEach((product) => {
      product.price = product.price ? parseFloat(product.price) : 0;
    });

    res.render('products', {
      title: 'Our Products',
      products,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: totalPages
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Error fetching products');
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    // Query to fetch the product by ID
const [productResult] = await db.query('SELECT * FROM products WHERE id = ?', [productId]);

if (productResult.length === 0) {
  res.status(404).send('Product not found');
  return;
}

const product = productResult[0];
product.price = parseFloat(product.price) || 0;

// Query to fetch reviews for the product
const [reviews] = await db.query('SELECT * FROM reviews WHERE productId = ?', [productId]);

// Render search-results template
res.render('search-results', { 
  title: product.name, 
  product: product, 
  reviews: reviews 
});

} catch (err) {
console.error('Error fetching product:', err);
res.status(500).send('Error fetching product');
}
};
/* 
exports.submitReview = async (req, res) => {
  const productId = req.params.id;
  const { name, comment } = req.body;

  try {
    // Insert a new review into the reviews table
    await db.query(
      'INSERT INTO reviews (productId, name, comment, created_at) VALUES (?, ?, ?, NOW())',
      [productId, name, comment]
    );

    // Redirect back to the product page after review submission
    res.redirect(`/products/${productId}`);
  } catch (err) {
    console.error('Error submitting review:', err);
    res.status(500).send('Error submitting review');
  }
}; */

// Vote for a review
exports.voteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
      await db.query(
          'UPDATE reviews SET votes = votes + 1 WHERE id = ?',
          [reviewId]
      );

      const [rows] = await db.query('SELECT productId FROM reviews WHERE id = ?', [reviewId]);
      const productId = rows[0].product_id;
      return res.redirect(`/products/${productId}`); // Redirect to the corresponding product page
  } catch (error) {
      console.error('Error voting for review:', error);
      return res.status(500).render('error', { message: 'Unable to vote. Please try again.' });
  }
};
