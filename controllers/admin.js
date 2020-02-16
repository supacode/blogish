const Post = require('./../models/Post');
const catchAsync = require('./../utils/catchAsync');

exports.getAddPost = catchAsync(async (req, res, next) => {
  res.status(200).render('admin/add-post', {
    title: 'Add Post'
  });
});

exports.postPost = catchAsync(async (req, res, next) => {
  const post = await Post.create({
    title: req.body.title,
    body: req.body.body
  });

  res.redirect(`/post/${post.slug}`);
});
