import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import { useState } from "react";
import displayCurrency from "../helpers/DisplayCurrency";
import { Link } from "react-router-dom";

const AdminProductCard = ({ data, fetchData, d }) => {
  const [editProduct, setEditProduct] = useState(false);
  const { sellingPrice, price, productName } = data;
  return (
    <Link to={"product/" + productName} className="mx-[5px] my-[5px] relative">
      <div className="bg-white w-[40vh] rounded-t h-[250px] p-5 ml-0.8">
        <div className="w-40 min-h-[38vh]">
          <img
            className="fit mx-auto"
            src={data?.productImage[0]}
            width={100}
            height={100}
          />
          <div>
            {/* <div
            onClick={() => setEditProduct(true)}
            className="cursor-pointer ml-auto w-fit p-2 bg-green-200 hover:bg-green-700 rounded-full hover:text-white"
          >
            <MdModeEdit />
          </div> */}
          </div>
        </div>
      </div>

      <div className="bg-slate-100 w-full h-[2px]"></div>

      <div className="bg-white w-[40vh] rounded-b h-[130px] p-5 ml-0.8">
        <div className="w-full">
          <div className="text-ellipsis line-clamp-2 text-sm mb-9">
            <h1 className="text-ellipsis hover:underline hover:text-red-500">{productName}</h1>
          </div>
          <div className="flex gap-4">
            <div className="font-semibold text-red-600">{` ${displayCurrency(
              sellingPrice
            )}`}</div>
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

    //   <div className="w-40 line-clamp-1">
    //     {/* <hr className="w-full"/> */}
    //     <div className="bg-black w-full h-[2px]"></div>
    //     <div className="text-ellipsis line-clamp-1 text-wrap">
    //       <h1 className="text-ellipsis line-clamp-1">{data.productName}</h1>
    //     </div>
    //     <div>
    //       <div className="font-semibold">{` ${displayCurrency(
    //         data.sellingPrice
    //       )}`}</div>
    //     </div>
    //   </div>

    //   {/* {editProduct && (
    //     <AdminEditProduct
    //       productData={data}
    //       onClose={() => setEditProduct(false)}
    //       fetchData={fetchData}
    //     />
    //   )} */}
    // </div>
  );
};

export default AdminProductCard;
