import { useContext, useRef } from "react";
import displayCurrency from "../helpers/DisplayCurrency";
import ScrollTop from "../helpers/ScrollTop";
import Context from "../context/Context";
import AddToCart from "../helpers/AddToCart";
import { Link, Outlet } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";

const VerticalCard = ({ loading, data }) => {
  const user = useSelector((state) => state?.user?.user);
  const loadingList = new Array(13).fill(null);
  const scrollElement = useRef();

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await AddToCart(e, id);
    fetchUserAddToCart();
  };

  
  return (
    <div className="flex items-center justify-center flex-wrap my-4 h-[calc(100vh-190px)] overflow-y-scroll scrollbar-none">
      {loading
        ? loadingList?.map((product, index) => {
            return (
              <div
                key={index}
                className="w-full max-w-[280px] md: min-w-[340px] bg-white rounded-sm shadow"
              >
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse">
                  {/* <img
                      src={product.productImage[0]}
                      className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                    /> */}
                </div>

                <div className="p-4 grid gap-3">
                  <h2 className="font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-black  p-1 py-2 animate-pulse rounded-full bg-slate-200"></h2>
                  <p className="capitalize text-slate-500 p-1 py-2 animate-pulse rounded-full bg-slate-200"></p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-semibold p-1 py-2 animate-pulse rounded-full bg-slate-200 w-full"></p>
                    <p className="text-slate-500 line-through p-1 py-2 animate-pulse rounded-full bg-slate-200 w-full"></p>
                  </div>
                  <button className="text-sm text-white px-3 py-2 rounded-full bg-slate-200 animate-pulse"></button>
                </div>
              </div>
            );
          })
        : data?.map((product, index) => {
            return (
              <div
                key={index}
                className=" mx-[5px] my-[5px] hover:shadow-lg relative bg-blue-200 shadow-lg"
              >
                <div className="bg-white w-[40vh] rounded-t h-[230px] p-5 ml-0.8 overflow-hidden">
                  <div className="flex justify-center items-center h-full">
                    <img
                      className="object-cover max-w-full max-h-full rounded"
                      src={product?.productImage[0]}
                      alt={product?.productName}
                    />
                  </div>
                </div>

                <div className="bg-slate-50 w-full h-[2px]"></div>

                <div className="bg-white w-[40vh] rounded-b h-[200px] p-5 ml-0.8">
                  <Link to={"product/" + product?._id} className="w-full">
                    <div className="text-ellipsis line-clamp-2 text-sm mb-4">
                      <h1 className="text-ellipsis hover:underline hover:text-red-500">
                        {product?.productName}
                      </h1>
                    </div>

                    <div className="text-ellipsis line-clamp-5 text-[12px] text-slate-500">
                      <h1 className="text-ellipsis hover:underline hover:text-red-500">
                        {product?.key_features}
                      </h1>
                    </div>
                  </Link>
                </div>

                <div className="bg-slate-50 w-full h-[2px]"></div>

                <div className="bg-white w-[40vh] rounded-b h-[130px] p-5 ml-0.8">
                  <div className="w-full">
                    <div className="flex gap-4">
                      <div className="font-semibold text-red-600">
                        {` ${displayCurrency(product?.sellingPrice)}`}
                      </div>
                      <div className="text-slate-500 line-through text-[13px] mt-2">
                        {displayCurrency(product?.price)}
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
                      to={`update-${product?.category}`} // Dynamically use the category for the link
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
                      to={`update-${product?.category}`} // Dynamically use the category for the link
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
                  save:{" "}
                  {displayCurrency(`${product?.price - product?.sellingPrice}`)}
                </div>

                <main className="w-full h-full">
                  <Outlet />
                </main>
              </div>
            );
          })}
    </div>
  );
};

export default VerticalCard;
