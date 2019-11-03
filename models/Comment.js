const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: [true, 'Comment must have a body']
    },
    post: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'Comment must belong to a post'],
      ref: 'Post'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

module.exports = mongoose.model('Comment', commentSchema);
