const mongoose = require("mongoose");

const tripsScheme = new mongoose.Schema({
  startPoint: {
    type: String,
    required: true,
    minlength: 4,
  },
  endPoint: {
    type: String,
    required: true,
    minlength: 4,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  seat: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  carImg: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
  },
  buddies: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Trips", tripsScheme);
