const router = require("express").Router();
const authController =require("../controllers/authController");

//  method for registering to database
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;