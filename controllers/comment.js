const Comment = require('../models/Comment');
const factory = require('./factoryHandler');

exports.assignPostIdToComment = (req, res, next) => {
  req.body.post = req.params.post;
  next();
};

exports.createComment = factory.createOne(Comment);

exports.deleteComment = factory.deleteOne(Comment);

exports.getComment = factory.getOne(Comment);

exports.updateComment = factory.updateOne(Comment);
