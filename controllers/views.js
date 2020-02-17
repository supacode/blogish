const Post = require('../models/Post');
const catchAsync = require('../utils/catchAsync');

exports.getHome = catchAsync(async (req, res, next) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });

  res.status(200).render('index', {
    title: 'Home',
    posts,
    active: 'home'
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const { slug } = req.params;

  const post = await Post.findOne({ slug });

  res.status(200).render('post', {
    title: post.title,
    active: 'post',
    post
  });
});
