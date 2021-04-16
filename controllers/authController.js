const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const authService = require("../services/authService");
const { COOKIE_NAME } = require("../config/config");

//for test
router.get("/", (req, res) => {
  res.send("authentication is On");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  authService
    .login(username, password)
    .then((token) => {
      //set token in cookies
      res.cookie(COOKIE_NAME, token, { httpOnly: true });
      res.redirect("/");
    })
    .catch((err) => {
      let error = Object.keys(err?.errors).map((x) => ({
        message: err.errors[x].properties.message,
      }))[0];
      // console.log(errors);
      res.render("login", { error });
    });
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res, next) => {
  const { username, password, repeatPassword } = req.body;
  if (password !== repeatPassword) {
    console.log(password);
    console.log(repeatPassword);
    return res.render("register", {
      error: { message: "Password missmatch!" },
    });
  }
  authService
    .register(username, password)
    .then((createdUser) => {
      console.log("createdUser");
      console.log(createdUser);
      res.redirect("/auth/login");
    })
    .catch((err) => {
      let error = Object.keys(err?.errors).map((x) => ({
        message: err.errors[x].properties.message,
      }))[0];
      // console.log(errors);
      res.render("register", { error });
    });
});

router.get("/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.redirect("/auth/login");
});

module.exports = router;
