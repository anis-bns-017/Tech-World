const express = require("express");

const router = express.Router();
const userSignupController = require("../controller/user/userSignup");
const userSigninController = require("../controller/user/userSignin");
const authToken = require("../middleware/authToken");
const userDetailsController = require("../controller/user/userDetails");
const userLogout = require("../controller/user/userLogout");
const allUsers = require("../controller/user/allUsers");
const updateUser = require("../controller/user/updateUser");
const UploadProductController = require("../controller/product/uploadProduct");
const getProductController = require("../controller/product/getProduct")
const updateProductController = require("../controller/product/updateProduct")

router.post("/signup", userSignupController);
router.post("/signin", userSigninController);
router.get("/user-details", authToken, userDetailsController);
router.get("/user-logout", userLogout);

//admin-panel
router.get("/all-users", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

//product
router.post("/upload-product", authToken, UploadProductController)
router.get("/get-product", getProductController)
router.post("/update-product", authToken, updateProductController)

module.exports = router;
