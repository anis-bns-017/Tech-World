const express = require("express");

const router = express.Router();
const userSignupController = require("../controller/userSignup");
const userSigninController = require("../controller/userSignin");
const authToken = require("../middleware/authToken");
const userDetailsController = require("../controller/userDetails");
const userLogout = require("../controller/userLogOut");
const allUsers = require("../controller/allUsers");
const updateUser = require("../controller/updateUser");

router.post("/signup", userSignupController);
router.post("/signin", userSigninController);
router.get("/user-details", authToken, userDetailsController);
router.get("/user-logout", userLogout);

//admin-panel
router.get("/all-users", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

module.exports = router;
