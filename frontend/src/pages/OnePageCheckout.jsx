import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import { useSelector } from "react-redux";

const OnePageCheckout = () => {
  const user = useSelector((state) => state?.user?.user);
  const [userData, setUserData] = useState([]);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartViewProduct.url, {
      method: SummaryApi.addToCartViewProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();
    if (responseData.success) {
      setUserData(responseData.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [data, setData] = useState({
    customar_firstName: "",
    customar_lastName: "",
    customar_email: "",
    customar_phone: "",
    customar_address: "",
    customar_city: "",
    customar_postCode: "",
    customar_region: "",
    customar_country: "",
    customar_comment: "",
    payment_method: "",
    delivery_method: "",
  });

  const [selectedMethod, setSelectedMethod] = useState("");

  const handleCheckboxChange = (method) => {
    setSelectedMethod(method);
  };

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(null);

  const handlePaymentCheckboxChange = (method) => {
    setSelectedPaymentMethod(method);
    data.payment_method = method;
  };

  const handleDeliveryCheckboxChange = (method) => {
    setSelectedDeliveryMethod(method);
    data.delivery_method = method;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const location = useLocation();
  const { products, total_amount, total_quantity } = location.state || {};
  // console.log("a: ", products);
  // console.log("b: ", total_amount);
  // console.log("c: ", total_quantity);

  const handlePayment = async (e) => {
    e.preventDefault();

    const response = fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        OrderData: data,
        userId: user,
        products,
        total_amount,
        total_quantity,
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
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <>
      <form onSubmit={handlePayment}>
        <div className="flex gap-5 justify-between pt-5">
          <div className="bg-slate-200 ml-10 p-5">
            <div>
              <div className="ml-[30px] bg text-2xl font-semibold text-blue-700 text-center">
                Customar Information
              </div>
            </div>

            <div>
              <div className="mx-auto pt-6 flex flex-col gap-2">
                <div className="flex gap-3">
                  <div>
                    <label className="text-sm font-semibold">First Name</label>
                    <span className="text-red-600">*</span>
                    <div className="bg-slate-50">
                      <input
                        type="text"
                        placeholder="First Name"
                        name="customar_firstName"
                        value={data?.customar_firstName}
                        onChange={handleChange}
                        required
                        className="border bg-slate-50 border-slate-400 p-2 rounded outline-none indent-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold"> Last Name </label>
                    <span className="text-red-600">*</span>
                    <div className="bg-slate-50">
                      <input
                        type="text"
                        placeholder="Last Name"
                        name="customar_lastName"
                        value={data?.customar_lastName}
                        onChange={handleChange}
                        required
                        className="border bg-slate-50 border-slate-400 p-2 rounded outline-none indent-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid">
                  <label>
                    Address <span className="text-red-600">*</span>
                  </label>

                  <div className="p-2">
                    <input
                      type="text"
                      placeholder="Address"
                      name="customar_address"
                      value={data?.customar_address}
                      required
                      onChange={handleChange}
                      className="-ml-2 w-[25.9rem] border bg-slate-50 border-slate-400 p-2 rounded outline-none indent-2"
                    />
                  </div>
                </div>

                <div className="grid">
                  <label>Phone</label>

                  <div className="p-2">
                    <input
                      type="number"
                      placeholder="Enter your Phone.."
                      name="customar_phone"
                      value={data?.customar_phone}
                      required
                      onChange={handleChange}
                      className="-ml-2 w-[25.9rem] border bg-slate-50 border-slate-400 p-2 rounded outline-none indent-2"
                    />
                  </div>
                </div>

                <div className="grid">
                  <label>Email</label>

                  <div className="p-2">
                    <input
                      type="email"
                      placeholder="Enter your Email.."
                      name="customar_email"
                      value={data?.customar_email}
                      required
                      onChange={handleChange}
                      className="-ml-2 w-[25.9rem] border bg-slate-50 border-slate-400 p-2 rounded outline-none indent-2"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <div>
                    <label className="text-sm font-semibold"> City </label>
                    <span className="text-red-600">*</span>
                    <div className="bg-slate-50">
                      <input
                        type="text"
                        placeholder="City"
                        name="customar_city"
                        value={data?.customar_city}
                        onChange={handleChange}
                        required
                        className="border bg-slate-50 border-slate-400 p-2 rounded outline-none indent-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold"> Post Code </label>
                    <span className="text-red-600">*</span>
                    <div className="bg-slate-50">
                      <input
                        type="number"
                        placeholder="Post Code"
                        name="customar_postCode"
                        value={data?.customar_postCode}
                        onChange={handleChange}
                        required
                        className="w-[32vh] border bg-slate-50 border-slate-400 p-2 rounded outline-none indent-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div>
                    <label className="text-sm font-semibold"> Country </label>
                    <span className="text-red-600">*</span>
                    <div className="bg-slate-50">
                      <select
                        name="customar_country" // Add name attribute
                        onChange={handleChange} // Use onChange instead of onClick
                        value={data?.customar_country} // Bind to state
                        className="w-[32vh] border bg-slate-50 border-slate-400 p-2 rounded outline-none indent-2"
                      >
                        <option value="">Select Country</option>
                        <option value="bangladesh">Bangladesh</option>
                        <option value="afghanistan">Afghanistan</option>
                        <option value="argentina">Argentina</option>
                        <option value="australia">Australia</option>
                        <option value="brazil">Brazil</option>
                        <option value="canada">Canada</option>
                        <option value="china">China</option>
                        <option value="denmark">Denmark</option>
                        <option value="egypt">Egypt</option>
                        <option value="finland">Finland</option>
                        <option value="france">France</option>
                        <option value="germany">Germany</option>
                        <option value="greece">Greece</option>
                        <option value="hungary">Hungary</option>
                        <option value="india">India</option>
                        <option value="indonesia">Indonesia</option>
                        <option value="iran">Iran</option>
                        <option value="iraq">Iraq</option>
                        <option value="ireland">Ireland</option>
                        <option value="israel">Israel</option>
                        <option value="italy">Italy</option>
                        <option value="japan">Japan</option>
                        <option value="kenya">Kenya</option>
                        <option value="malaysia">Malaysia</option>
                        <option value="mexico">Mexico</option>
                        <option value="nepal">Nepal</option>
                        <option value="netherlands">Netherlands</option>
                        <option value="new-zealand">New Zealand</option>
                        <option value="nigeria">Nigeria</option>
                        <option value="norway">Norway</option>
                        <option value="pakistan">Pakistan</option>
                        <option value="philippines">Philippines</option>
                        <option value="poland">Poland</option>
                        <option value="portugal">Portugal</option>
                        <option value="qatar">Qatar</option>
                        <option value="russia">Russia</option>
                        <option value="saudi-arabia">Saudi Arabia</option>
                        <option value="singapore">Singapore</option>
                        <option value="south-africa">South Africa</option>
                        <option value="south-korea">South Korea</option>
                        <option value="spain">Spain</option>
                        <option value="sri-lanka">Sri Lanka</option>
                        <option value="sweden">Sweden</option>
                        <option value="switzerland">Switzerland</option>
                        <option value="thailand">Thailand</option>
                        <option value="turkey">Turkey</option>
                        <option value="uganda">Uganda</option>
                        <option value="uk">United Kingdom</option>
                        <option value="usa">United States</option>
                        <option value="vietnam">Vietnam</option>
                        <option value="zimbabwe">Zimbabwe</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid">
                    <label className="text-sm font-semibold">
                      Region / State
                      <span className="text-red-600">*</span>{" "}
                    </label>

                    <select
                      name="customar_region" // Add name attribute
                      onChange={handleChange} // Use onChange instead of onClick
                      value={data?.customar_region} // Bind to state
                      className="w-[32vh] border bg-slate-50 border-slate-400 p-2 rounded outline-none indent-2"
                    >
                      <option value="">---Please Select---</option>
                      <option value="dhaka">Dhaka City</option>
                      <option value="chittagong">Chittagong City</option>
                      <option value="rajshahi">Rajshahi City</option>
                      <option value="sylhet">Sylhet City</option>
                      <option value="khulna">Khulna City</option>
                      <option value="rangpur">Rangpur</option>
                      <option value="gazipur">Gazipur City</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                </div>
                <label htmlFor="description" className="mt-3">
                  Comment :
                </label>
                <textarea
                  className="h-40 p-2 bg-slate-50 border resize-none"
                  placeholder="Leave your Comment..."
                  rows={3}
                  cols={5}
                  onChange={handleChange}
                  name="customar_comment"
                  value={data?.customar_comment}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="max-w-lg mx-auto p-6 bg-slate-200 rounded shadow">
              <h1 className="text-2xl font-bold text-center mb-2">
                Payment Method
              </h1>
              <h3 className="text-blue-600 my-5 text-center mb-6">
                Select a payment method
              </h3>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="cod"
                    checked={selectedPaymentMethod === "COD"}
                    onChange={() => handlePaymentCheckboxChange("COD")}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="cod" className="ml-2 text-gray-700">
                    Cash on Delivery
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="online"
                    checked={selectedPaymentMethod === "Online"}
                    onChange={() => handlePaymentCheckboxChange("Online")}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="online" className="ml-2 text-gray-700">
                    Online Payment
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="pos"
                    checked={selectedPaymentMethod === "POS"}
                    onChange={() => handlePaymentCheckboxChange("POS")}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="pos" className="ml-2 text-gray-700">
                    POS on Delivery
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full mr-5">
            <div className="max-w-md mx-auto p-6 bg-slate-200 rounded shadow">
              <h1 className="text-2xl font-bold text-center mb-2">
                Delivery Method
              </h1>
              <h3 className="text-blue-600 my-5 text-center mb-6">
                Select a delivery method
              </h3>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="home-delivery"
                    checked={selectedDeliveryMethod === "Home Delivery"}
                    onChange={() =>
                      handleDeliveryCheckboxChange("Home Delivery")
                    }
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="home-delivery" className="ml-2 text-gray-700">
                    Home Delivery - 60৳
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="store-pickup"
                    checked={selectedDeliveryMethod === "Store Pickup"}
                    onChange={() =>
                      handleDeliveryCheckboxChange("Store Pickup")
                    }
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="store-pickup" className="ml-2 text-gray-700">
                    Store Pickup - 0৳
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="express-request"
                    checked={selectedDeliveryMethod === "Request Express"}
                    onChange={() =>
                      handleDeliveryCheckboxChange("Request Express")
                    }
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="express-request"
                    className="ml-2 text-gray-700"
                  >
                    Request Express - Charge Applicable
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center m-5 justify-between">
          <div>
            <input
              type="checkbox"
              id="express-request"
              checked={selectedMethod === "Request Express"}
              onChange={() => handleCheckboxChange("Request Express")}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="express-request"
              className="ml-2 text-gray-700"
              required
            >
              I have read and agree to the Terms and Conditions, Privacy Policy
              and Refund and Return Policy
            </label>
          </div>
          <div className="flex justify-center items-center my-5">
            <div className="relative inline-flex  group">
              <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
              <button
                type="submit"
                className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default OnePageCheckout;
