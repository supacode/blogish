const express = require('express');

const postController = require('./../controllers/post');

const router = express.Router();

router.route('/').post(postController.createPost);

router
  .route('/:id')
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
