import { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context/Context";
import displayCurrency from "../helpers/DisplayCurrency";
import { MdDelete } from "react-icons/md";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.addToCartViewProduct.url, {
      method: SummaryApi.addToCartViewProduct.method,
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

  const increaseQuantity = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decreaseQuantity = async (id, qty) => {
    if (qty > 1) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
        context.fetchUserAddToCart();
      }
    }
  };

  const deleteCartItem = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    currency: "BDT",
    postCode: "",
    address: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const totalQuantity = data.reduce(
    (prevValue, CurrValue) => prevValue + CurrValue.quantity,
    0
  );

  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  const handlePayment = async (e) => {
    e.preventDefault();

    const response = fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        products: data,
        buyerDetails: formData,
        total_amount: totalPrice,
        total_quantity: totalQuantity,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        window.location.replace(result.url);
        console.log(result);
        // Handle result here
      })
      .catch((error) => {
        console.error("Error during fetch:", error.message);
        // Handle error gracefully
      });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      fetchData();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="container mx-auto">

      <div className="text-center font-lg">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row my-2 gap-10 lg:justify-between p-4">
        {/* //View product */}
        <div className="w-full max-w-3xl ">
          {loading
            ? loadingCart.map((el) => {
                return (
                  <div
                    key={el + "Add to cart loading"}
                    className="bg-slate-200 w-full h-32 my-2 border border-slate-300 animate-pulse rounded"
                  ></div>
                );
              })
            : data.map((product) => {
                return (
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
                      {/* delete product */}
                      <div
                        className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 cursor-pointer hover:text-white"
                        onClick={() => deleteCartItem(product._id)}
                      >
                        <MdDelete />
                      </div>
                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId?.category}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-red-600 font-semibold text-lg">
                          {displayCurrency(product?.productId?.sellingPrice)}
                        </p>
                        <p className="text-slate-600 font-semibold text-lg">
                          {displayCurrency(
                            product?.productId?.sellingPrice * product?.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          className="border bg-red-700 border-red-600 font-semibold text-white animation-all hover:scale-110 hover:bg-red-600 hover:text-white w-6 h-6 rounded"
                          onClick={() =>
                            decreaseQuantity(product._id, product?.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          className="border bg-green-600 border-blue-600 font-semibold animation-all text-white  hover:bg-green-900 hover:scale-110 hover:text-white w-6 h-6 rounded"
                          onClick={() =>
                            increaseQuantity(product._id, product?.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* summary product */}
        <div>
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
                    <Link to={"onepageCheckout"}>
                      CheckOut
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div>
        <form
          onSubmit={handlePayment}
          className="bg-gray-100 p-6 rounded-md shadow-md w-full max-w-md mx-auto"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 p-2"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4 flex gap-2">
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="border-gray-300 w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 p-2"
            >
              <option value="BDT">BDT</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
            <input
              type="text"
              name="postCode"
              value={formData.postCode}
              onChange={handleChange}
              className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 p-2"
              placeholder="Post code"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 p-2"
              placeholder="Enter your address"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 p-2"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white font-medium py-2 rounded-md hover:bg-red-600 transition"
          >
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cart;
