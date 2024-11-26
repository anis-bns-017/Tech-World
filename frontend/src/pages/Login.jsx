import { useContext, useState } from "react";
import loginIcons from "../assest/signin.gif";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context/Context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

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

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails();
      fetchUserAddToCart();
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  //console.log("Data login", data);

  return (
    <div>
      {/* <Link to={"/otp-project"} className="bg-blue-500 p-5 rounded-lg m-5 hover:bg-blue-400">GO</Link> */}
      <section id="login">
        <div className="mx-auto container p-4">
          <div className="bg-slate-800 p-5 w-full max-w-lg mx-auto rounded">
            <h2 className="text-[21px] text-white">Account Login</h2>
            <form
              className="pt-6 flex flex-col gap-2 rounded-[5px]"
              onSubmit={handleSubmit}
            >
              <div className="grid">
                <label className="text-[17px] text-white">
                  {" "}
                  Phone / E-mail
                </label>
                <div className="bg-blue-100 rounded outline-none p-2 hover:border-red-600">
                  <input
                    type="email"
                    placeholder="Email or Phone"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    className="w-full h-full bg-transparent outline-none indent-2"
                  />
                </div>
              </div>

              <div className="mt-3">
                <div className="flex">
                  <label className="text-white"> Password : </label>
                  <Link
                    to={"/forgot-password"}
                    className="block w-fit ml-auto hover:underline text-red-600 indent-2"
                  >
                    Forgotten Password
                  </Link>
                </div>
                <div className="bg-blue-100 p-2 flex">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    className="w-full h-full bg-transparent outline-none indent-2"
                  />
                </div>
              </div>

              <button className="flex justify-center items-center mt-2">
                <div className="relative inline-flex  group">
                  <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                  <div className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                    Login
                  </div>
                </div>
              </button>
            </form>

            <p className="mb-12 text-center mt-5">
              <div className="flex">
                <p className="flex-1 h-[0.1px] bg-slate-300 mt-3"></p>
                <p className="flex-1">Don&apos;t have account ?</p>
                <p className="flex-1 h-[0.1px] bg-slate-300 mt-3"></p>
              </div>
              <div className="flex justify-center items-center mt-2">
                <div className="relative inline-flex  group">
                  <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                  <Link
                    to={"/sign-up"}
                    className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    role="button"
                  >
                    Create an Account
                  </Link>
                </div>
              </div>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
