const mongoose = require('mongoose');
const validator = require('validator');
const user = require('./user');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
    },
  },

  owner: {
    type: mongoose.ObjectId,
    required: true,
    ref: user,
  },

  likes: {
    type: [mongoose.ObjectId],
    default: [],
    ref: user,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
