const express = require('express');

const adminController = require('./../controllers/admin');

const router = express.Router();

router
  .route('/post')
  .get(adminController.getAddPost)
  .post(adminController.postPost);

module.exports = router;
