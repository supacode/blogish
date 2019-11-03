const express = require('express');

const postController = require('../controllers/post');

const commentRouter = require('./comment');

const router = express.Router();

router.route('/').post(postController.createPost);

router.use('/:post/comment', commentRouter);

router
  .route('/:id')
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
