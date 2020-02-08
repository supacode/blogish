const Post = require('../models/Post');
const catchAsync = require('../utils/catchAsync');

exports.getHome = catchAsync(async (req, res, next) => {
  const posts = await Post.find({});

  res.status(200).render('index', {
    title: 'Home',
    posts
  });
});
