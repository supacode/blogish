const express = require('express');

const authController = require('./../controllers/auth');

const router = express.Router();

router.post('/', authController.signUp);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:resetToken', authController.resetPassord);

router.patch(
  '/update-password',
  authController.protect,
  authController.updatePassword
); // Update password for logged in user

module.exports = router;
