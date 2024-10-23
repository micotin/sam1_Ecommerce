const express = require('express');
const router = express.Router();
const searchController = require('../controller/searchController');
const productController = require('../controller/productController');

// Route for searching products
router.get('/', searchController.searchProducts);

// Route for displaying a specific product by ID
router.get('/:id', productController.getProductById);

module.exports = router;
