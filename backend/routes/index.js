const express = require("express");

const router = express.Router();
const userSignupController = require("../controller/user/userSignup");
const userSigninController = require("../controller/user/userSignin");
const authToken = require("../middleware/authToken");
const userDetailsController = require("../controller/user/userDetails");
const userLogout = require("../controller/user/userLogout");
const allUsers = require("../controller/user/allUsers");
const updateUser = require("../controller/user/updateUser");
const updateRoleByAdmin = require("../controller/user/updateRoleByAdmin");
const UploadProductController = require("../controller/product/uploadProduct");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProduct = require("../controller/product/getCategoryProductOne");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const getProductDetails = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/user/addToCartController");
const countAddToCartProduct = require("../controller/user/countAddToCartProduct");
const addToCartViewProduct = require("../controller/user/addToCartViewProduct");
const updateAddtoCartProduct = require("../controller/user/updateAddtoCartProduct");
const deleleAddToCartProduct = require("../controller/user/deleleAddToCartProduct");
const searchProudct = require("../controller/product/searchProduct");
const updateAddressController = require("../controller/user/updateAddressController");
const desktopUploadController = require("../controller/productUpload/desktopUploadController");
const laptopUploadController = require("../controller/productUpload/laptopUploadController");
const monitorUploadController = require("../controller/productUpload/monitorUploadController");
const phoneUploadController = require("../controller/productUpload/phoneUploadController");
const tabletUploadController = require("../controller/productUpload/tabletUploadController");
const cameraUploadController = require("../controller/productUpload/cameraUploadController");
const keyboardUploadController = require("../controller/productUpload/keyboardUploadController");
const mouseUploadController = require("../controller/productUpload/mouseUploadController");
const headphoneUploadController = require("../controller/productUpload/headphoneUploadController");
const getMobile = require("../controller/getSeperateProduct/getMobile");
const filterPhoneController = require("../controller/getSeperateProduct/filterMobiles");
const paymentController = require("../controller/order/paymentController")

router.post("/signup", userSignupController);
router.post("/signin", userSigninController);
router.get("/user-details", authToken, userDetailsController);
router.get("/user-logout", userLogout);

//admin-panel
router.get("/all-users", authToken, allUsers);
router.post("/update-user", authToken, updateUser);
router.post("/update-role-admin", authToken, updateRoleByAdmin);

//user
router.post("/update-address", authToken, updateAddressController);

//product

//upload
router.post("/upload-desktop", authToken, desktopUploadController);
router.post("/upload-laptop", authToken, laptopUploadController);
router.post("/upload-monitor", authToken, monitorUploadController);
router.post("/upload-phone", authToken, phoneUploadController);
router.post("/upload-tablet", authToken, tabletUploadController);
router.post("/upload-camera", authToken, cameraUploadController);
router.post("/upload-keyboard", authToken, keyboardUploadController);
router.post("/upload-mouse", authToken, mouseUploadController);
router.post("/upload-headphone", authToken, headphoneUploadController);

//other thing about product.
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchProudct);

//filter product start from here.
router.post("/filter-phone", filterPhoneController);

//get individual product
router.get("/get-mobile", getMobile);

//user add to cart
router.post("/addToCart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/view-cart-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddtoCartProduct);
router.post("/delete-cart-product", authToken, deleleAddToCartProduct);

//payment and order
router.post("/checkout", authToken, paymentController)

module.exports = router;
