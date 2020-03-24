const multer = require('multer');

const Post = require('./../models/Post');
const catchAsync = require('./../utils/catchAsync');
const { generateRandomStr } = require('./../utils/utils');

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/posts');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${Date.now()}_${generateRandomStr(7)}.${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image')) {
    return cb(null, false);
  }

  cb(null, true);
};

const upload = multer({ storage: diskStorage, fileFilter });

exports.uploadPhoto = upload.single('image');

exports.getAddPost = catchAsync(async (req, res, next) => {
  res.status(200).render('admin/add-post', {
    title: 'Add Post',
    active: 'add-post'
  });
});

exports.postPost = catchAsync(async (req, res, next) => {
  const postObj = {
    title: req.body.title,
    body: req.body.body
  };

  if (req.file) {
    postObj.coverImage = req.file.filename;
  }

  const post = await Post.create(postObj);

  res.redirect(`/post/${post.slug}`);
});
