const express = require('express');

const adminController = require('./../controllers/admin');

const authController = require('./../controllers/auth');

const router = express.Router();

router.use(authController.protect, authController.restrictTo('admin'));

router
  .route('/post')
  .get(adminController.getAddPost)
  .post(adminController.postPost);

module.exports = router;
