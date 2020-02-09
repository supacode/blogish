const mongoose = require('mongoose');
const slugify = require('slugify');

const { generateRandomStr } = require('./../utils/utils');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Post must have a title']
    },
    body: {
      type: String,
      required: [true, 'Post must have body']
    },
    slug: {
      type: String,
      unique: true
    },
    datePosted: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
  }
);

postSchema.index({ slug: 1 });

// Create slug
postSchema.pre('save', function(next) {
  const slug = slugify(this.title, { lower: true }).concat(
    `-${generateRandomStr(5)}`
  );

  this.slug = slug;

  next();
});

// Virtual populate comments
postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post'
});

module.exports = mongoose.model('Post', postSchema);
