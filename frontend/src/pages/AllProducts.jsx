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
    <div>
      <div className="bg-white py-2 px-4 flex justify-between">
        <h2 className="text-lg font-bold"> All Products </h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:text-white hover:bg-red-800 py-2 px-4 rounded-full transition-all"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload a product
        </button>
      </div>

      {/* All product */}
      <div className="flex items-center gap-5 py-4">
        {allProduct.map((product, index) => {
          return (
            <AdminProductCard data={product} key={index + "allproducts"}/>
          );
        })}
      </div>

      {/* Upload product component */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} />
      )}
    </div>
  );
};

export default AllProducts;
