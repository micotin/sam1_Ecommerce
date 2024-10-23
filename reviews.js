const express = require('express');
const router = express.Router();
const reviewController = require('../controller/reviewController');

// Add review route
router.post('/products/:productId/reviews', reviewController.addReview);

// Vote route
router.post('/reviews/vote/:id', reviewController.voteReview);

// Get reviews for a product
router.get('/products/:productId/reviews', reviewController.getReviewsForProduct);

module.exports = router;
