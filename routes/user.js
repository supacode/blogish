const express = require('express');

const authController = require('./../controllers/auth');

const router = express.Router();

router.route('/').post(authController.signUp);

module.exports = router;
