const Comment = require('../models/Comment');
const factory = require('./factoryHandler');

exports.assignPostIdToComment = (req, res, next) => {
  if (!req.body.post) req.body.post = req.params.post;
  next();
};

exports.createComment = factory.createOne(Comment);

exports.deleteComment = factory.deleteOne(Comment);

exports.getComment = factory.getOne(Comment, { path: 'post' });

exports.updateComment = factory.updateOne(Comment);
