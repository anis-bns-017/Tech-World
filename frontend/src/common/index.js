
const backendDomain = "http://localhost:8080";

const SummaryApi = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "post",
  },

  updateUserAddress: {
    url: `${backendDomain}/api/update-address`,
    method: "post",
  },

  uploadDesktop: {
    url: `${backendDomain}/api/upload-desktop`,
    method: "post",
  },

  uploadLaptop: {
    url: `${backendDomain}/api/upload-laptop`,
    method: "post",
  },

  uploadMonitor: {
    url: `${backendDomain}/api/upload-monitor`,
    method: "post",
  },

  uploadPhone: {
    url: `${backendDomain}/api/upload-phone`,
    method: "post",
  },
  uploadTablet: {
    url: `${backendDomain}/api/upload-tablet`,
    method: "post",
  },

  uploadCamera: {
    url: `${backendDomain}/api/upload-camera`,
    method: "post",
  },

  uploadKeyboard: {
    url: `${backendDomain}/api/upload-keyboard`,
    method: "post",
  },

  uploadMouse: {
    url: `${backendDomain}/api/upload-mouse`,
    method: "post",
  },

  uploadHeadphone: {
    url: `${backendDomain}/api/upload-headphone`,
    method: "post",
  },

  current_user: {
    url: `${backendDomain}/api/user-details`,
    method: "get",
  },

  logout_user: {
    url: `${backendDomain}/api/user-logout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomain}/api/all-users`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomain}/api/update-user`,
    method: "post",
  },
  updateRole: {
    url: `${backendDomain}/api/update-role-admin`,
    method: "post",
  },
  updatePassword: {
    url: `${backendDomain}/api/password`,
    method: "post",
  },
  updateAddress: {
    url: `${backendDomain}/api/update-address`,
    method: "post",
  }, 
  uploadProduct: {
    url: `${backendDomain}/api/upload-product`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomain}/api/get-product`,
    method: "get",
  },
  getOrderList: {
    url: `${backendDomain}/api/get-orderRequest`,
    method: "get",
  },

  //individual product starts from here.
  
  allMobiles: {
    url: `${backendDomain}/api/get-mobile`,
    method: "get",
  },

  updateProduct: {
    url: `${backendDomain}/api/update-product`,
    method: "post",
  },
  categoryProduct: {
    url: `${backendDomain}/api/get-categoryProduct`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendDomain}/api/category-product`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomain}/api/product-details`,
    method: "post",
  },
  addToCartProduct: {
    url: `${backendDomain}/api/addToCart`,
    method: "post",
  },
  addToCartProductCount: {
    url: `${backendDomain}/api/countAddToCartProduct`,
    method: "get",
  },
  addToCartViewProduct: {
    url: `${backendDomain}/api/view-cart-product`,
    method: "get",
  },
  getOrderedProducts: {
    url: `${backendDomain}/api/get-orderedProducts`,
    method: "get",
  },
  updateCartProduct: {
    url: `${backendDomain}/api/update-cart-product`,
    method: "post",
  },
  //product category starts from here.
  mobilePhoneCategory: {
    url: `${backendDomain}/api/mobile-phone`,
    method: "get",
  },
  deleteCartProduct: {
    url: `${backendDomain}/api/delete-cart-product`,
    method: "post",
  },
  searchProduct: {
    url: `${backendDomain}/api/search`,
    method: "get",
  },

  //filter product start from here.
  filterPhones: {
    url: `${backendDomain}/api/filter-phone`,
    method: "post",
  },
  payment: {
    url: `${backendDomain}/api/checkout`,
    method: "post",
  },
  success: {
    url: `${backendDomain}/api/payment-success/:transactionId`,
    method: "post",
  },
  fail: {
    url: `${backendDomain}/api/payment-fail/:transactionId`,
    method: "post",
  },

  //update Product
  updateTablet: {
    url: `${backendDomain}/api/update-tablet`,
    method: "post",
  },

  UpdateMonitor: {
    url: `${backendDomain}/api/update-monitor`,
    method: "post",
  },

  updateHeadPHone: {
    url: `${backendDomain}/api/update-headphone`,
    method: "post",
  },

  updatePhone: {
    url: `${backendDomain}/api/update-phone`,
    method: "post",
  },

  updateLaptop: {
    url: `${backendDomain}/api/update-laptop`,
    method: "post",
  },

  updateCamera: {
    url: `${backendDomain}/api/update-camera`,
    method: "post",
  },
};

export default SummaryApi;
