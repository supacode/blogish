const Post = require('./../models/Post');

const factory = require('./factoryHandler');

exports.createPost = factory.createOne(Post);

exports.getPost = factory.getOne(Post);

exports.updatePost = factory.updateOne(Post);

exports.deletePost = factory.deleteOne(Post);
