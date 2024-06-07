const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();



//user signup
router.get("/signup", userController.user_signup_get);

router.post("/signup", userController.user_signup_post);

//user login
router.get("/login", userController.user_login_get);

router.post("/login", userController.user_login_post);

// user profile
router.get("/profile", userController.user_profile);

//user logout
router.get("/logout", userController.user_logout);

module.exports = router;
