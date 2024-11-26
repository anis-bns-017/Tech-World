import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import { useSelector } from "react-redux";

const UpdateUserInfo = () => {
  const user = useSelector((state) => state?.user?.user);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // const navigate = useNavigate();

  // Initialize form data with user information when the component mounts
  useEffect(() => {
    if (user) {
      setData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(SummaryApi.updateUser.url, {
        method: SummaryApi.updateUser.method, // Use POST method
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success(responseData.message);
      } else {
        toast.error(responseData.message || "Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("An error occurred while updating user information");
    }
  };

  return (
    <>
      <div className="ml-[200px] text-2xl text-blue-700 mb-4">
        My Account Information
      </div>
      <div className="bg-slate-800 hover:shadow-inherit p-8 w-full max-w-md lg:max-w-lg mx-auto rounded shadow-md">
        <form className="pt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-sm text-white font-semibold">First Name</label>
              <span className="text-red-600">*</span>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
                required
                className="border bg-white border-slate-400 p-2 rounded outline-none w-full"
              />
            </div>

            <div className="w-1/2">
              <label className="text-sm text-white font-semibold">Last Name</label>
              <span className="text-red-600">*</span>
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
                required
                className="border bg-white border-slate-400 p-2 rounded outline-none w-full"
              />
            </div>
          </div>

          <div className="grid mt-3">
            <label className="text-white">
              E-mail <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
              className="border bg-white border-slate-400 p-2 rounded outline-none w-full"
            />
          </div>

          <div className="grid mt-3">
            <label className="text-white">
              Telephone <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              placeholder="Telephone"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              required
              className="border bg-white border-slate-400 p-2 rounded outline-none w-full"
            />
          </div>

          <div className="flex justify-center items-center">
            <div className="relative inline-flex  group">
              <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
              <a
                href="#"
                title="Get quote now"
                className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                role="button"
              >
                Continue
              </a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateUserInfo;
