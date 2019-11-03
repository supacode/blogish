const express = require('express');

const commentController = require('./../controllers/comment');

const router = express.Router({ mergeParams: true });

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
