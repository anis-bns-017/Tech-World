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
  const {fetchUserDetails, fetchUserAddToCart} = useContext(Context);

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
      credentials: 'include', 
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });


    const dataApi = await dataResponse.json();
 
    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate('/');
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
              Don't have account ?{" "}
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
    </div>
  );
};

export default Login;
