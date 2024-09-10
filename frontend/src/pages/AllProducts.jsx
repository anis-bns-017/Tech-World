import { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
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
    <div className="pl-5Gz pt-10">
      <div className="items-center justify-center text-center">
        <h2 className="font-bold text-2xl">Featured Products</h2>
        <p>Check & Get Your Desired Product!</p>
      </div>
      <div className="flex items-center flex-wrap my-4 ml-8 h-[calc(100vh-190px)] overflow-y-scroll scrollbar-none">
        {allProduct.map((product, index) => {
          return (
            <AdminProductCard
              data={product}
              key={index + "allproducts"}
              fetchData={fetchAllProduct}
            />
          );
        })}
      </div>
    </div>

    // <div className="pl-5">
    //   <div className="bg-white py-2 px-4 flex justify-between">
    //     <h2 className="text-lg font-bold"> All Products </h2>
    //     <button
    //       className="border-2 border-red-600 text-red-600 hover:text-white hover:bg-red-800 py-2 px-4 rounded-full transition-all"
    //       onClick={() => setOpenUploadProduct(true)}
    //     >
    //       Upload a product
    //     </button>
    //   </div>

    //   {/* All product */}
    //   <h2 className="">Featured Products</h2>
    //   <p>Check &amp; Get Your Desired Product!</p>
    //   <div className="flex items-center flex-wrap gap-3 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
    //     {allProduct.map((product, index) => {
    //       return (
    //         <AdminProductCard
    //           data={product}
    //           key={index + "allproducts"}
    //           fetchData={fetchAllProduct}
    //         />
    //       );
    //     })}
    //   </div>

    //   {/* Upload product component */}
    //   {/* {openUploadProduct && (
    //       <UploadProduct
    //         onClose={() => setOpenUploadProduct(false)}
    //         fetchData={fetchAllProduct}
    //       />
    //     )} */}
    // </div>
  );
};

export default AllProducts;
