const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  catId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  commentedOn: {
    type: Date,
    default: Date.now,
  },
});

//const Comment = mongoose.model('Comment', commentSchema);

module.exports = commentSchema;
