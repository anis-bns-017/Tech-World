import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    otp: "",
  });

  const navigate = useNavigate();

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
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,

        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();
      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Please check password and confirm password");
    }
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-slate-800 p-5 w-full max-w-md mx-auto rounded">
          <h2 className="text-[21px] text-white font-medium">
            Register Account
          </h2>
          <form className="pt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex gap-3">
              <div className="w-full">
                <label className="text-sm text-white  font-semibold">
                  First Name
                </label>
                <span className="text-red-600">*</span>
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={data.firstName}
                  onChange={handleChange}
                  required
                  className="border bg-slate-50 border-slate-400 p-2 rounded outline-none w-full"
                />
              </div>

              <div className="w-full">
                <label className="text-sm text-white font-semibold">
                  Last Name
                </label>
                <span className="text-red-600">*</span>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={data.lastName}
                  onChange={handleChange}
                  required
                  className="border bg-slate-50 border-slate-400 p-2 rounded outline-none w-full"
                />
              </div>
            </div>

            <div className="grid">
              <label className="text-white ">
                E-mail <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                placeholder="E-mail"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
                className="border bg-slate-50 border-slate-400 p-2 rounded outline-none w-full"
              />
            </div>

            <div className="grid">
              <label className="text-white ">
                Password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={handleChange}
                required
                className="border bg-slate-50 border-slate-400 p-2 rounded outline-none w-full"
              />
            </div>

            <div className="grid">
              <label className="text-white ">
                Confirm Password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                required
                className="border bg-slate-50 border-slate-400 p-2 rounded outline-none w-full"
              />
            </div>

            <div className="grid">
              <label className="text-white ">
                Telephone <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                placeholder="Telephone"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                required
                className="border bg-slate-50 border-slate-400 p-2 rounded outline-none w-full"
              />
            </div>

            <button className="flex justify-center items-center">
              <div className="relative inline-flex  group">
                <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                <div className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                  Continue
                </div>
              </div>
            </button>
          </form>
          <div className="flex justify-center items-center my-5">
            <p className="w-[80px] h-[0.1px] bg-slate-300"></p>
            <p className="px-2 text-white ">Already have an account?</p>
            <p className="w-[80px] h-[0.1px] bg-slate-300"></p>
          </div>
          <p className="text-center text-white ">
            If you already have an account with us, please login at the
            <Link
              to="/login"
              className="text-red-500  hover:underline cursor-pointer ml-1"
            >
              Login Page
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
