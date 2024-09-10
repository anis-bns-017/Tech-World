import { useContext, useRef } from "react";
import displayCurrency from "../helpers/DisplayCurrency";
import ScrollTop from "../helpers/ScrollTop";
import Context from "../context/Context";
import AddToCart from "../helpers/AddToCart";
import { Link } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const VerticalCard = ({ loading, data}) => {
  const loadingList = new Array(13).fill(null);
  const scrollElement = useRef();

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await AddToCart(e, id);
    fetchUserAddToCart();
  };

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };
  return (
    <div
      className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all"
      ref={scrollElement}
    >
      <button
        onClick={scrollLeft}
        className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
      >
        {<FaAngleLeft />}
      </button>
      <button
        onClick={scrollRight}
        className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden: md:block"
      >
        {<FaAngleRight />}
      </button>
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
              <Link
                to={"/product/" + product?._id}
                key={index}
                className="w-full max-w-[280px] md: min-w-[340px] bg-white rounded-sm shadow"
                onClick={ScrollTop}
              >
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                  <img
                    src={product?.productImage[0]}
                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                  />
                </div>

                <div className="p-4 grid gap-3">
                  <h2 className="font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-slate-500">
                    {product.category}
                  </p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-semibold">
                      {displayCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayCurrency(product?.price)}
                    </p>
                  </div>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full"
                    onClick={(e) => handleAddToCart(e)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            );
          })}
    </div>
  );
};

export default VerticalCard;
