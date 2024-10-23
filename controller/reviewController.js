const db = require('../config/dbConfig'); // Your MySQL connection pool

// Add a review for a product
const addReview = async (req, res) => {
    const { productId, name, rating, comment } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO reviews (product_id, name, rating, comment, votes) VALUES (?, ?, ?, ?, ?)',
            [productId, name, rating, comment, 0] // Initialize votes to 0
        );

        console.log('Review added:', result.insertId);
        return res.redirect(`/products/${productId}`); // Redirect to the product page after adding review
    } catch (error) {
        console.error('Error adding review:', error);
        return res.status(500).render('error', { message: 'Unable to add review. Please try again.' });
    }
};

const voteReview = async (req, res) => {
    const { reviewId } = req.params;

    try {
        await db.query('UPDATE reviews SET votes = votes + 1 WHERE id = ?', [reviewId]);

        // Get the product ID of the reviewed item
        const [rows] = await db.query('SELECT productId FROM reviews WHERE id = ?', [reviewId]);
        const productId = rows[0]?.productId;

        if (!productId) {
            return res.status(404).render('error', { message: 'Product not found.' });
        }

        return res.redirect(`/products/${productId}`); // Redirect back to the product page
    } catch (error) {
        console.error('Error voting for review:', error);
        return res.status(500).render('error', { message: 'Unable to vote. Please try again.' });
    }
};


// Get reviews for a product
const getReviewsForProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const [reviews] = await db.query('SELECT * FROM reviews WHERE product_id = ?', [productId]);
        return res.render('product', { reviews, productId }); // Adjust as needed for your view rendering
    } catch (error) {
        console.error('Error retrieving reviews:', error);
        return res.status(500).render('error', { message: 'Unable to retrieve reviews. Please try again.' });
    }
};

module.exports = {
    addReview,
    voteReview,
    getReviewsForProduct
};
