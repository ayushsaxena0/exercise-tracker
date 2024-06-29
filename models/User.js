const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    default: () => new Date().toDateString(),
  },
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  log: [exerciseSchema],
});

module.exports = mongoose.model("User", UserSchema);
