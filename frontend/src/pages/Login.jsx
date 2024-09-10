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
      <section id="login">
        <div className="mx-auto container p-4">
          <div className="bg-slate-100 p-5 w-full max-w-lg mx-auto rounded">
            <h2 className="text-[21px]">Account Login</h2>
            <form
              className="pt-6 flex flex-col gap-2 rounded-[5px]"
              onSubmit={handleSubmit}
            >
              <div className="grid">
                <label className="text-[17px]"> Phone / E-mail </label>
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
                  <label> Password : </label>
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
                    className="w-full h-full bg-transparent  outline-none"
                  />
                </div>
              </div>

              <button className="bg-blue-800 text-white px-6 py-2 w-fulltransition-all rounded-[5px] block mt-6 pcBuilder cursor-pointer hover:bg-blue-500">
                Login
              </button>
            </form>

            <p className="mb-12 text-center mt-5">
              <div className="flex">
                <p className="flex-1 h-[0.1px] bg-slate-300 mt-3"></p>
                <p className="flex-1">Don&apos;t have account ?</p>
                <p className="flex-1 h-[0.1px] bg-slate-300 mt-3"></p>
              </div>
              <Link
                to={"/sign-up"}
                className="bg-slate-100 text-center border-[1px] text-blue-800  px-6 py-2 w-fulltransition-all rounded-[5px] block mt-6 pcBuilder cursor-pointer hover:bg-blue-500"
              >
                Create Your Account
              </Link>
            </p>
          </div>
        </div>
      </section>
      <div>
        {/* <div>
      <section id="login">
        <div className="mx-auto container p-4">
          <div className="bg-white p-5 w-full max-w-sm mx-auto rounded">
            <div className="w-20 h-20 mx-auto ">
              <img src={loginIcons} alt="login icons" />
            </div>

            <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
              <div className="grid">
                <label> Email : </label>
                <div className="bg-slate-100 p-2">
                  <input
                    type="email"
                    placeholder="enter email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    className="w-full h-full outline-none bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label> Password : </label>
                <div className="bg-slate-100 p-2 flex">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="enter password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    className="w-full h-full outline-none bg-transparent"
                  />

                  <div
                    className="cursor-pointer text-xl"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <span>{showPassword ? <IoEye /> : <IoMdEyeOff />}</span>
                  </div>
                </div>

                <Link
                  to={"/forgot-password"}
                  className="block w-fit ml-auto hover:underline hover:text-red-600"
                >
                  Forgot Password
                </Link>
              </div>

              <button className="bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-500">
                Login
              </button>
            </form>

            <p className="my-5">
              Dont have account ?{" "}
              <Link
                to={"/sign-up"}
                className="text-red-600 hover:underline hover:text-red-700"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div> */}
      </div>
    </div>
  );
};

export default Login;
