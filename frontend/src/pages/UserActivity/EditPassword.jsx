import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../../common";

const EditPassword = () => {
  const user = useSelector((state) => state?.user?.user);
  const [data, setData] = useState({
    password: ""
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
      <div className="ml-[185px] text-2xl text-blue-700">Chnage Password</div>
      <div className="ml-[185px] mt-5 text-black">
        Please type and confirm to change your current password.
      </div>
      <div className="bg-slate-50 p-5 w-full max-w-sm mx-[27vh] rounded">
        <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>


          <div className="grid mt-3">
            <label className="font-semibold">
              Old Password <span className="text-red-600">*</span>
            </label>
            <div className="bg-slate-50 p-2">
              <input
                type="password"
                placeholder="Old Password"
                name="old-password"
                value={data.password}
                onChange={handleChange}
                required
                className="w-full border bg-slate-50 border-slate-400 p-2 rounded outline-none indent-2"
              />
            </div>
          </div>

          <div className="grid mt-3">
            <label className="font-semibold">
              New Password <span className="text-red-600">*</span>
            </label>
            <div className="bg-slate-50 p-2">
              <input
                type="password"
                placeholder="Old Password"
                name="new-password"
                value={data.password}
                onChange={handleChange}
                required
                className="w-full border bg-slate-50 border-slate-400 p-2 rounded outline-none indent-2"
              />
            </div>
          </div>

          <div className="grid mt-3">
            <label className="font-semibold">
              Password Confirm <span className="text-red-600">*</span>
            </label>
            <div className="bg-slate-50 p-2">
              <input
                type="password"
                placeholder="Password Confirm"
                name="password-confirm"
                value={data.password}
                onChange={handleChange}
                required
                className="w-full border bg-slate-50 border-slate-400 p-2 rounded outline-none indent-2"
              />
            </div>
          </div>
           

          <button
            type="submit"
            className="bg-blue-800 text-white px-6 py-2 mt-6 rounded hover:bg-blue-500 transition-all"
          >
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default EditPassword;
