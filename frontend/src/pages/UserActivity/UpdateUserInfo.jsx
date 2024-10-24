import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import { useNavigate } from "react-router-dom";
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
    <div className="bg-slate-50 p-5 w-full max-w-sm mx-auto rounded">
      <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <div>
            <label className="text-sm font-semibold">First Name</label>
            <span className="text-red-600">*</span>
            <div className="bg-slate-100">
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
                required
                className="border bg-slate-100 border-slate-400 p-2 rounded outline-none indent-2"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold">Last Name</label>
            <span className="text-red-600">*</span>
            <div className="bg-slate-100">
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
                required
                className="border bg-slate-100 border-slate-400 p-2 rounded outline-none indent-2"
              />
            </div>
          </div>
        </div>

        <div className="grid mt-3">
          <label>E-mail <span className="text-red-600">*</span></label>
          <div className="bg-slate-100 p-2">
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
              className="w-full border bg-slate-100 border-slate-400 p-2 rounded outline-none indent-2"
            />
          </div>
        </div>

        <div className="grid">
          <label>Telephone <span className="text-red-600">*</span></label>
          <div className="bg-slate-100 p-2">
            <input
              type="tel"
              placeholder="Telephone"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              required
              className="w-full border bg-slate-100 border-slate-400 p-2 rounded outline-none indent-2"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-800 text-white px-6 py-2 mt-6 rounded hover:bg-blue-500 transition-all"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUserInfo;
