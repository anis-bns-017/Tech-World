import { useEffect, useState } from "react";
import SummaryApi from "../../common";
import displayCurrency from "../../helpers/DisplayCurrency";

const OrderHistory = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.getOrderedProducts.url, {
      method: SummaryApi.getOrderedProducts.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();
    if (responseData.success) {
      setData(responseData.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
      <div>
        <div
          className="ml-[200px] mb-5 text-2xl text-blue-700 cursor-pointer"
        >
          Order History
        </div>
        {data.map((product) => {
          return (
            <div
              key={product?._id + "Order History is loading"}
              className="grid grid-cols-[128px,1fr] mb-2 shadow-lg bg-white w-[50rem] h-32 my-1 border mx-auto border-slate-300 rounded"
            >
              <div className="w-32 h-32 bg-slate-200">
                <img
                  src={product?.product?.productId?.productImage[0]}
                  alt="Product"
                  className="w-full h-full mix-blend-multiply object-scale-down"
                />
              </div>

              <div className="px-4 py-2 relative">
                <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                  {product?.product?.productId?.productName}
                </h2>
                <p className="capitalize text-slate-500">
                  {product?.product?.productId?.category}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-red-600 font-semibold text-lg">
                    {displayCurrency(
                      product?.product?.productId?.sellingPrice
                    )}
                  </p>
                  <p className="text-red-600 font-semibold text-lg">
                    {displayCurrency(
                      product?.product?.productId?.sellingPrice *
                        product?.product?.quantity
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span>{"Quantity: " + product?.product.quantity}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default OrderHistory;
