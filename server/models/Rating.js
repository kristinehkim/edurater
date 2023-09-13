const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ratingSchema = new Schema({
  ratingText: {
    type: String,
    required: 'You need to leave a rating!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  ratingAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  ratedEducator: {
    type: String,
    required: true,
    trim: true,
  },
  educatorRating: {
    type: Number,
    required: true,
    minimun: 1,
    maximun: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      commentRating: {
        type: Number,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});
ratingSchema.index({ratingAuthor: 1 , ratedEducator: 1}, {unique: true})
const Rating = model('Rating', ratingSchema);

module.exports = Rating;
