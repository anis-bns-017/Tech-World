import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UserAddress = () => {
  const user = useSelector((state) => state?.user?.user);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: user?.email,
    phone: "",
    company: "",
    address1: "",
    address2: "",
    city: "",
    post_code: "",
    country: "",
    region: "",
  });

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

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.updateUserAddress.url, {
        method: SummaryApi.updateUserAddress.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();
      if (dataApi.success) {
        toast.success(dataApi.message);
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Please check password and confirm password");
    }
  };
  return (
    <>
      <div>
        <div className="ml-[200px] text-2xl text-blue-700">Add New Address</div>
      </div>

      <div>
        <form
          className="ml-[200px] pt-6 flex flex-col gap-2"
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

          <div className="grid mt-3">
            <label>Company</label>

            <div className="bg-slate-50 p-2">
              <input
                type="text"
                placeholder="Company"
                name="company"
                value={data.company}
                required
                onChange={handleChange}
                className="-ml-2 w-[25.9rem] border bg-slate-50 border-slate-400 p-2 rounded outline-none indent-2"
              />
            </div>
          </div>

          <div className="grid mt-3">
            <label>
              Address 1 <span className="text-red-600">*</span>
            </label>

            <div className="bg-slate-50 p-2">
              <input
                type="text"
                placeholder="Address 1"
                name="address1"
                value={data.address1}
                required
                onChange={handleChange}
                className="-ml-2 w-[25.9rem] border bg-slate-50 border-slate-400 p-2 rounded outline-none indent-2"
              />
            </div>
          </div>

          <div className="grid mt-3">
            <label>Address 2</label>

            <div className="bg-slate-50 p-2">
              <input
                type="text"
                placeholder="Address2"
                name="address2"
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

          <p className="my-4 text-lg font-semibold text-gray-700">
            Default Address
          </p>
          <div>
            <label className="flex items-center">
              <input
                type="radio"
                name="agreement"
                value="Yes"
                className="choiceAddress"
              />
              <span className="ml-5">Yes</span>
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                name="agreement"
                value="No"
                className="choiceAddress"
              />
              <span className="ml-5">No</span>
            </label>
          </div>

          <button className="bg-blue-800 w-[25.9rem] text-white px-6 py-2 w-fulltransition-all text-center rounded-[5px] block mt-6 pcBuilder cursor-pointer hover:bg-blue-500">
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default UserAddress;
