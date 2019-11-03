const mongoose = require('mongoose');
const slugify = require('slugify');

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
      type: String
    },
    datePosted: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Create slug
postSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Virtual populate comments
postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post'
});

module.exports = mongoose.model('Post', postSchema);
