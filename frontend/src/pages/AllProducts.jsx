import { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";
import DropdownMenu from "./UserActivity/DropdownMenu";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";
import SellerProductCard from "../components/SellerProductCard";

const AllProducts = () => {
  const user = useSelector((state) => state?.user?.user);

  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div className=" pl-5 pt-10">
      <div className="items-center justify-center text-center">
        <h2 className="font-bold text-2xl">Featured Products</h2>
        <p>Check & Get Your Desired Product!</p>
      </div>
      <div className="flex items-center flex-wrap my-4 ml-8 h-[calc(100vh-190px)] overflow-y-scroll scrollbar-none">
        {allProduct.map((product, index) => {
          return user?.role === "ADMIN" ? (
            <SellerProductCard
              data={product}
              key={index + "allproducts"}
              fetchData={fetchAllProduct}
            />
          ) : (
            <AdminProductCard
              data={product}
              key={index + "allproducts"}
              fetchData={fetchAllProduct}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;
