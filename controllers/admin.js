const Post = require('./../models/Post');
const catchAsync = require('./../utils/catchAsync');

exports.getAddPost = catchAsync(async (req, res, next) => {
  res.status(200).render('admin/add-post', {
    title: ''
  });
});

exports.postPost = catchAsync(async (req, res, next) => {});
