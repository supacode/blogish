const express = require('express');

const authController = require('./../controllers/auth');
const commentController = require('./../controllers/comment');

const router = express.Router({ mergeParams: true });

// Protected routes from here on

router.use(authController.protect);

router
  .route('/')
  .post(
    commentController.assignPostIdToComment,
    commentController.createComment
  );

router
  .route('/:id')
  .get(commentController.getComment)
  .patch(commentController.updateComment)
  .delete(commentController.deleteComment);

module.exports = router;
