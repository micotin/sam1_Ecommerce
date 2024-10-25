const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const reviewController = require('../controller/reviewController');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/reviews/vote/:reviewId', reviewController.voteReview);
router.get('/search', productController.searchProducts);

module.exports = router;