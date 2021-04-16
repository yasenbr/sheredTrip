const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/config");

const register = (username, password) => {
  let user = new User({ username, password });
  return user.save();
};

const login = async (username, password) => {
  let user = await User.findOne({ username });

  if (!user) return Promise.reject({ message: "No found user", status: 404 });
  let equal = await bcrypt.compare(password, user.password);
  if (!equal)
    return Promise.reject({
      message: "Password is not valid",
      status: 404,
    });
  //create token

  let token = jwt.sign({ _id: user._id, username: user.username }, SECRET);
  return token;
};

module.exports = {
  register,
  login,
};
