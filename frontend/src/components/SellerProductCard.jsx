import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import { useContext, useState } from "react";
import displayCurrency from "../helpers/DisplayCurrency";
import { Link } from "react-router-dom";
import AddToCart from "../helpers/AddToCart";
import Context from "../context/Context";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

const SellerProductCard = ({ data, fetchData}) => {

  const user = useSelector((state) => state?.user?.user);
  const userId = user?._id;

  const [editProduct, setEditProduct] = useState(false);
  const { sellingPrice, price, productName, key_features, category } = data;

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e) => {
    await AddToCart(e, data, userId);
    fetchUserAddToCart();
  };

  return (
    <Link
      to={"product/" + productName}
      className="mx-[5px] my-[5px] hover:shadow-lg relative bg-blue-200 shadow-lg"
    >
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
        <div className="w-full">
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
        </div>
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
      </div>
      <div className="bg-purple-900 text-white text-[13px] absolute top-4 px-1 rounded-r-full indent-1">
        save: {displayCurrency(`${price - sellingPrice}`)}
      </div>
    </Link>
  );
};

export default SellerProductCard;
