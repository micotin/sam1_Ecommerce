const db = require('../config/dbcon'); 
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

module.exports = {
    voteReview
};
