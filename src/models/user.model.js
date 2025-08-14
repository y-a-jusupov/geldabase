const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    accountId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      default: null,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model('User', userSchema);

exports.User = User;
