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
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
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
        path: "product-category/:categoryName",
        element: <CategoryProduct />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
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
            element: <EditPassword />
          },
          {
            path: "order", 
            element: <OrderHistory />
          },
          {
            path: "quotes", 
            element: <UserQuotes />
          },
          {
            path: "address", 
            element: <UserAddress />
          },
        ]
      },
      

      {
        path: "search",
        element: <SearchProduct />,
      },
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
    ],
  },
]);

export default router;
