const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

router.get('/', adminController.getAllAdmins);
//router.get('/', adminController.AddAdmin);

module.exports = router;