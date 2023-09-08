const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const rateSchema = new Schema({
  rateText: {
    type: String,
    required: 'You need to leave a rate!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  rateAuthor: {
    type: String,
    required: true,
    trim: true,
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
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Rate = model('Rate', rateSchema);

module.exports = Rate;
