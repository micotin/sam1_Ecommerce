const express = require('express');
const router = express.Router();
const homeController = require('../controller/homeController');

router.get('/home', homeController.getHomePage); // This line remains unchanged

module.exports = router;
