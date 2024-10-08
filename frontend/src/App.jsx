import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SummaryApi from "./common";
import { useEffect, useState } from "react";
import Context from "./context/Context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import AllProducts from "./pages/AllProducts";
import NavBar from "./components/NavBar";

const App = () => {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    setCartProductCount(dataApi?.data?.count);
  };

  useEffect(() => {
    //user details
    fetchUserDetails();
    cartProductCount,
      //user details cart products
      fetchUserAddToCart();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, //use details fetch
          cartProductCount, //current user add to cart product count
          fetchUserAddToCart,
        }}
      >
        <ToastContainer />

        <Header />
        <NavBar />

        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>

        <Footer />
      </Context.Provider>
    </>
  );
};

export default App;
