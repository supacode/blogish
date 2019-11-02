const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Post must have a title']
  },
  body: {
    type: String,
    required: [true, 'Post must have body']
  },
  datePosted: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', postSchema);
