const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const reviewController = require('../controller/reviewController');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
//router.post('/:id/review', productController.submitReview);
router.post('/reviews/vote/:reviewId', reviewController.voteReview);

module.exports = router;