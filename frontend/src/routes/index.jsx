import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../components/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import UserAccount from "../pages/UserAccount";
import OrderHistory from "../pages/UserActivity/OrderHistory";
import EditPassword from "../pages/UserActivity/EditPassword";
import UpdateUserInfo from "../pages/UserActivity/UpdateUserInfo";
import UserQuotes from "../pages/UserActivity/UserQuotes";
import UserAddress from "../pages/UserActivity/UserAddress";
import Desktop from "../components/uploadProduct/Desktop";
import Laptop from "../components/uploadProduct/Laptop";
import Monitor from "../components/uploadProduct/Monitor";
import Phone from "../components/uploadProduct/Phone";
import Tablet from "../components/uploadProduct/Tablet";
import Camera from "../components/uploadProduct/Camera";
import Keyboard from "../components/uploadProduct/Keyboard";
import Mouse from "../components/uploadProduct/Mouse";
import HeadPhone from "../components/uploadProduct/HeadPhone";
import DropDown from "../dropMenu/DropDown";
import MobileCategory from "../pages/productCategory/MobileCategory";
import Success from "../../../backend/controller/order/Success";
import Cancel from "../../../backend/controller/order/Cancel";
import UpdateTablet from "../components/updateProducts/UpdateTablet";
import UpdateMonitor from "../components/uploadProduct/Monitor";
import UpdateHeadPhone from "../components/updateProducts/UpdateHeadphone";
import UpdatePhone from "../components/updateProducts/UpdatePhone";
import UpdateLaptop from "../components/updateProducts/UpdateLaptop";
import OnePageCheckout from "../pages/OnePageCheckout";
import Fail from "../../../backend/controller/order/Fail";
import Anis from "../dropMenu/Anis";
import AnisDown from "../dropMenu/AnisDown";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "success",
        element: <Success />,
      },
      {
        path: "cancel",
        element: <Cancel />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },

      {
        path: "upload",
        element: <DropDown />,
      },

      {
        path: "upload-desktop",
        element: <Desktop />,
      },

      {
        path: "upload-laptop",
        element: <Laptop />,
      },
      {
        path: "upload-monitor",
        element: <Monitor />,
      },
      {
        path: "upload-phone",
        element: <Phone />,
      },
      {
        path: "upload-tablet",
        element: <Tablet />,
      },
      {
        path: "upload-camera",
        element: <Camera />,
      },
      {
        path: "upload-keyboard",
        element: <Keyboard />,
      },
      {
        path: "upload-mouse",
        element: <Mouse />,
      },

      {
        path: "upload-headphone",
        element: <HeadPhone />,
      },

      {
        path: "product-category/:categoryName",
        element: <CategoryProduct />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "mobile-phone/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },

      {
        path: "cart/onepageCheckout",
        element: <OnePageCheckout />,
      },

      {
        path: "payment-success/:transactionId",
        element: <Success />,
      },

      {
        path: "payment-fail/:transactionId",
        element: <Fail />,
      },

      {
        path: "account",
        element: <UserAccount />,
        children: [
          {
            path: "edit",
            element: <UpdateUserInfo />,
          },
          {
            path: "edit-password",
            element: <EditPassword />,
          },
          {
            path: "order",
            element: <OrderHistory />,
          },
          {
            path: "quotes",
            element: <UserQuotes />,
          },
          {
            path: "address",
            element: <UserAddress />,
          },
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          },
        ],
      },

      {
        path: "update-tablet",
        element: <UpdateTablet />,
      },
      {
        path: "update-monitor",
        element: <UpdateMonitor />,
      },
      {
        path: "update-headphone",
        element: <UpdateHeadPhone />,
      },
      {
        path: "update-phone",
        element: <UpdatePhone />,
      },
      {
        path: "update-laptop",
        element: <UpdateLaptop />,
      },

      //category start from here.
      {
        path: "mobile-phone",
        element: <MobileCategory />,
      },
      {
        path: "search",
        element: <SearchProduct />,
      },
      //update Products

      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          },
        ],
      },
      {
        path: "anis",
        element: <AnisDown />,
      },
      {
        path: "admin-panel/all-products/update-tablet",
        element: <UpdateTablet />,
      },
      {
        path: "admin-panel/all-products/update-monitor",
        element: <UpdateMonitor />,
      },
      {
        path: "admin-panel/all-products/update-headphone",
        element: <UpdateHeadPhone />,
      },
      {
        path: "admin-panel/all-products/update-tablet",
        element: <UpdateTablet />,
      },
      {
        path: "account/all-products/update-tablet",
        element: <UpdateTablet />,
      },
      {
        path: "account/all-products/update-monitor",
        element: <UpdateMonitor />,
      },
      {
        path: "account/all-products/update-headphone",
        element: <UpdateHeadPhone />,
      },
      {
        path: "account/all-products/update-tablet",
        element: <UpdateTablet />,
      },
    ],
  },
]);

export default router;
