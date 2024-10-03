const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

router.get('/', checkoutController.getCheckoutPage);
router.post('/', checkoutController.processCheckout);

module.exports = router;