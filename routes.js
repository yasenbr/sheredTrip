//controller
const router = require("express").Router();
const homeController = require("./controllers/homeController");
const authController = require("./controllers/authController");
const tripsController = require("./controllers/tripsController");
//use
router.use("/", homeController);
router.use("/trips", tripsController);
router.use("/auth", authController);

module.exports = router;
