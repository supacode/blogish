const express = require('express');

const authController = require('./../controllers/auth');

const router = express.Router();

router.route('/').post(authController.signUp);
router.route('/login').post(authController.login);

// Update password for logged in user
router
  .route('/update-password')
  .patch(authController.protect, authController.updatePassword);

module.exports = router;
