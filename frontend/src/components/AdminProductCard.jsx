import { useContext, useEffect, useState } from "react";
import displayCurrency from "../helpers/DisplayCurrency";
import { Link, Outlet } from "react-router-dom";
import AddToCart from "../helpers/AddToCart";
import Context from "../context/Context";
import { MdEdit } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import SummaryApi from "../common";

const AdminProductCard = ({ data, fetchData }) => {
  const user = useSelector((state) => state?.user?.user);

  const userId = user?._id;
  const productId = data?._id;

  const [editProduct, setEditProduct] = useState(false);
  const { sellingPrice, price, productName, key_features, category } = data;

  const { fetchUserAddToCart } = useContext(Context);

  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const handleAddToCart = async (e) => {
    await AddToCart(e, data, userId);
    fetchUserAddToCart();
  };

  const productConfig = [
    {
      category: "phone",
      link: "update-phone",
    },
    {
      category: "tablet",
      link: "update-tablet",
    },
    {
      category: "laptop",
      link: "update-laptop",
    },
    {
      category: "camera",
      link: "update-camera",
    },
    {
      category: "headphone",
      link: "update-headphone",
    },
    {
      category: "desktop",
      link: "update-desktop",
    },
    {
      category: "monitor",
      link: "update-monitor",
    },
  ];

  // Finding the corresponding link based on the product category
  const currentProductConfig = productConfig.find(
    (config) => config.category === data?.category
  );

  return (
    <div className="mx-[5px] my-[5px] hover:shadow-lg relative bg-blue-200 shadow-lg">
      <div className="bg-white w-[40vh] rounded-t h-[230px] p-5 ml-0.8 overflow-hidden">
        <div className="flex justify-center items-center h-full">
          <img
            className="object-cover max-w-full max-h-full rounded"
            src={data?.productImage[0]}
            alt={productName}
          />
        </div>
      </div>

      <div className="bg-slate-50 w-full h-[2px]"></div>

      <div className="bg-white w-[40vh] rounded-b h-[200px] p-5 ml-0.8">
        <Link to={"product/" + productId} className="w-full">
          <div className="text-ellipsis line-clamp-2 text-sm mb-4">
            <h1 className="text-ellipsis hover:underline hover:text-red-500">
              {productName}
            </h1>
          </div>

          <div className="text-ellipsis line-clamp-5 text-[12px] text-slate-500">
            <h1 className="text-ellipsis hover:underline hover:text-red-500">
              {key_features}
            </h1>
          </div>
        </Link>
      </div>

      <div className="bg-slate-50 w-full h-[2px]"></div>

      <div className="bg-white w-[40vh] rounded-b h-[130px] p-5 ml-0.8">
        <div className="w-full">
          <div className="flex gap-4">
            <div className="font-semibold text-red-600">
              {` ${displayCurrency(sellingPrice)}`}
            </div>
            <div className="text-slate-500 line-through text-[13px] mt-2">
              {displayCurrency(price)}
            </div>
          </div>
        </div>
        {user?.role === "GENERAL" && (
          <div className="text-center justify-center mt-3 rounded-lg">
            <button
              className="bg-blue-50 rounded-sm hover:bg-blue-700 hover:text-white h-12 text-blue-800 px-3 py-1 w-full text-center justify-center flex gap-3 text-xl"
              onClick={(e) => handleAddToCart(e)}
            >
              <span className="mt-2">
                <FaShoppingCart />
              </span>
              <span className="mt-1">Buy Now</span>
            </button>
          </div>
        )}
        {user?.role === "SELLER" && (
          <Link
            to={`update-${data?.category}`} // Dynamically use the category for the link
            state={{ product: data }}
            className="text-center justify-center mt-3 rounded-lg"
          >
            <button className="bg-blue-50 rounded-sm hover:bg-blue-700 hover:text-white h-12 text-blue-800 px-3 py-1 w-full text-center justify-center flex gap-3 text-xl">
              <span className="mt-2">
                <MdEdit />
              </span>
              <span className="mt-1">Edit Product</span>
            </button>
          </Link>
        )}
        {user?.role === "ADMIN" && (
          <Link
            to={`update-${data?.category}`} // Dynamically use the category for the link
            state={{ product: data }}
            className="text-center justify-center mt-3 rounded-lg"
          >
            <button className="bg-blue-50 rounded-sm hover:bg-blue-700 hover:text-white h-12 text-blue-800 px-3 py-1 w-full text-center justify-center flex gap-3 text-xl">
              <span className="mt-2">
                <MdEdit />
              </span>
              <span className="mt-1">Edit Product</span>
            </button>
          </Link>
        )}
      </div>
      <div className="bg-purple-900 text-white text-[13px] absolute top-4 px-1 rounded-r-full indent-1">
        save: {displayCurrency(`${price - sellingPrice}`)}
      </div>

      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminProductCard;
