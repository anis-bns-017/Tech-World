import { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context/Context";
import displayCurrency from "../helpers/DisplayCurrency";
import { MdDelete } from "react-icons/md";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderList = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state?.user?.user);
  const [loading, setLoading] = useState(true);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.getOrderList.url, {
      method: SummaryApi.getOrderList.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    setLoading(false);

    const responseData = await response.json();
    if (responseData.success) {
      setData(responseData.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log("wok: ", data[0]);

  const totalQuantity = data.reduce(
    (prevValue, CurrValue) => prevValue + CurrValue.quantity,
    0
  );

  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  console.log("user: ", user);
  console.log("woww: ", data);
  return (
    <div className="container mx-auto">
      <div className="text-center font-lg">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5 text-3xl text-red-600 font-bold">
            No Product has been Ordered Yet!!{" "}
          </p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row my-2 gap-10 lg:justify-between p-4">
        {/* //View product */}
        <div className="w-full">
          <div className="font-bold text-4xl text-blue-700 text-center justify-center mb-5 shadow-lg ">
            Order List
          </div>
          {loading
            ? loadingCart.map((el) => {
                return (
                  // <div
                  //   key={el + "Add to cart loading"}
                  //   className="bg-red-800 w-full h-32 my-2 border border-slate-300 animate-pulse rounded"
                  // ></div>
                  <div key={el}></div>
                );
              })
            : data?.map((order) => {
                return order?.products?.map((product) => (
                  <div key={product?._id}>
                    {product?.productId?.userId === user?._id && (
                      <div className="flex gap-5">
                        <div
                          key={product?._id + "Add to cart loading"}
                          className="grid grid-cols-[128px,1fr] bg-white w-full h-32 my-1 border border-slate-300 rounded"
                        >
                          <div className="w-32 h-32 bg-slate-200">
                            <img
                              src={product?.productId?.productImage[0]}
                              alt=""
                              className="w-full h-full mix-blend-multiply object-scale-down"
                            />
                          </div>

                          <div className="px-4 py-2 relative">
                            {/* Product name */}
                            <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                              {product?.productId?.productName}
                            </h2>
                            <p className="capitalize text-slate-500">
                              {product?.productId?.category}
                            </p>
                            <div className="flex justify-between items-center">
                              <p className="text-red-600 font-semibold text-lg">
                                {displayCurrency(
                                  product?.productId?.sellingPrice
                                )}
                              </p>
                              <p className="text-slate-600 font-semibold text-lg">
                                {displayCurrency(
                                  product?.productId?.sellingPrice *
                                    product?.quantity
                                )}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span>{"Quantity: " + product?.quantity}</span>
                            </div>
                          </div>
                        </div>
                        <Link
                          to="product-details"
                          state={{ order: order }}
                          className="text-xl bg-blue-800 text-white p-2 h-10 mt-12 rounded-md cursor-pointer"
                        >
                          View
                        </Link>
                      </div>
                    )}
                  </div>
                ));
              })}
        </div>
        <div>
          <Outlet />
        </div>

        {/* summary product */}
        {/* <div>
          {data[0] && (
            <div className="mt-5 lg:mt-0 w-full max-w-sm">
              {loading ? (
                <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
              ) : (
                <div className="h-36 bg-slate-200">
                  <h2 className="bg-blue-900 text-center text-xl font-semibold p-2 mt-4 text-white w-full rounded">
                    Summary
                  </h2>
                  <div className="flex justify-between items-center px-4 gap-2 font-medium text-lg text-slate-600">
                    <p>Quantity</p>
                    <p>{totalQuantity}</p>
                  </div>

                  <div className="flex justify-between items-center px-4 gap-2 font-medium text-lg text-slate-600">
                    <p>Total Price</p>
                    <p>{displayCurrency(totalPrice)}</p>
                  </div>

                  <div className="bg-lime-600 text-center text-xl font-semibold p-2 mt-4 text-white w-full rounded">
                    <Link
                      to={{
                        pathname: "onepageCheckout",
                      }}
                      state={{
                        products: data,
                        total_amount: totalPrice,
                        total_quantity: totalQuantity,
                      }}
                    >
                      CheckOut
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default OrderList;
