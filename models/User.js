const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { SALT_ROUNDS, SECRET } = require("../config/config");

const userScheme = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    isEmail: {
      bail: true,
    },
  },
  password: {
    type: String,
    required: [true, "password field cant be empty"],
    minlength: [4, "min length of the field is 4 chars"],
  },
  tripsHistory: [
    {
      type: mongoose.Types.ObjectId,
      ref: "TripsHistory",
    },
  ],
});

userScheme.pre("save", function (next) {
  bcrypt
    .genSalt(SALT_ROUNDS)
    .then((salt) => bcrypt.hash(this.password, salt))
    .then((hash) => {
      this.password = hash;
      next();
    });
});
module.exports = mongoose.model("User", userScheme);
