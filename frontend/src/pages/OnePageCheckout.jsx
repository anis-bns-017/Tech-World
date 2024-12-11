import { useState } from "react";
import { useSelector } from "react-redux";

const OnePageCheckout = () => {
  // useEffect(() => {
  //   // Display success message
  //   toast.success(
  //     "Payment successful! Thank you for your purchase. Please provide information to reach you out..."
  //   );
  // }, []);

  const user = useSelector((state) => state?.user?.user);
  const [data, setData] = useState({
    customer: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postCode: "",
      region: "",
      country: "",
      comment: "",
    },
    orderItems: [
      {
        productId: "",
        name: "",
        quantity: 0,
        price: 0,
      },
    ],
    totalAmount: 0,
    totalQuantity: 0,
    paymentInfo: {
      status: "pending",
      transactionId: "",
      method: "sslcommerz",
    },
    orderStatus: "pending",
    payment_method: "Cash on Delivery",
    delivery_method: "Home Delivery",
  });

  const [selectedMethod, setSelectedMethod] = useState("");

  const handleCheckboxChange = (method) => {
    setSelectedMethod(method);
  };

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(null);

  const handlePaymentCheckboxChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleDeliveryCheckboxChange = (method) => {
    setSelectedDeliveryMethod(method);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (data.password === data.confirmPassword) {
    //   const dataResponse = await fetch(SummaryApi.updateUserAddress.url, {
    //     method: SummaryApi.updateUserAddress.method,
    //     credentials: "include",
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   const dataApi = await dataResponse.json();
    //   if (dataApi.success) {
    //     toast.success(dataApi.message);
    //   }

    //   if (dataApi.error) {
    //     toast.error(dataApi.message);
    //   }
    // } else {
    //   toast.error("Please check password and confirm password");
    // }
  };

  return (
    <>
      <div className="flex gap-5 justify-between pt-5">
        <div className="bg-slate-200 ml-10 p-5">
          <div>
            <div className="ml-[30px] bg text-2xl font-semibold text-blue-700 text-center">
              Customar Information
            </div>
          </div>

          <div>
            <form
              className="mx-auto pt-6 flex flex-col gap-2"
              onSubmit={handleSubmit}
            >
              <div className="flex gap-3">
                <div>
                  <label className="text-sm font-semibold"> First Name </label>
                  <span className="text-red-600">*</span>
                  <div className="bg-slate-50">
                    <input
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      value={data.firstName}
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
                      name="lastName"
                      value={data.lastName}
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
                    name="address1"
                    value={data.address1}
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
                    placeholder="phone"
                    name="phone"
                    value={data.address2}
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
                      name="city"
                      value={data.city}
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
                      type="text"
                      placeholder="Post Code"
                      name="post_code"
                      value={data.post_code}
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
                      name="country" // Add name attribute
                      onChange={handleChange} // Use onChange instead of onClick
                      value={data.country} // Bind to state
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
                    name="region" // Add name attribute
                    onChange={handleChange} // Use onChange instead of onClick
                    value={data.region} // Bind to state
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
                name="description"
                value={data.description}
              ></textarea>
              <button className="bg-blue-800 w-[25.9rem] text-white px-6 py-2 w-fulltransition-all text-center rounded-[5px] block mt-6 pcBuilder cursor-pointer hover:bg-blue-500">
                Continue
              </button>
            </form>
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

            <button
              onClick={() =>
                selectedPaymentMethod
                  ? alert(`You selected: ${selectedPaymentMethod}`)
                  : alert("Please select a payment method!")
              }
              className="mt-6 w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Confirm Payment
            </button>
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
                  onChange={() => handleDeliveryCheckboxChange("Home Delivery")}
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
                  onChange={() => handleDeliveryCheckboxChange("Store Pickup")}
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
                <label htmlFor="express-request" className="ml-2 text-gray-700">
                  Request Express - Charge Applicable
                </label>
              </div>
            </div>

            <button
              onClick={() =>
                selectedDeliveryMethod
                  ? alert(`You selected: ${selectedDeliveryMethod}`)
                  : alert("Please select a delivery method!")
              }
              className="mt-6 w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Confirm Delivery Method
            </button>
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
            <button className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnePageCheckout;
