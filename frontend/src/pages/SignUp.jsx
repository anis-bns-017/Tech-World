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
        <div className="bg-slate-50 p-5 w-full max-w-sm mx-auto rounded">
          <h2 className="text-[21px] font-medium">Register Account</h2>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
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
              <label>
                E-mail <span className="text-red-600">*</span>
              </label>

              <div className="bg-slate-50 p-2">
                <input
                  type="email"
                  placeholder="E-mail"
                  name="email"
                  value={data.email}
                  required
                  onChange={handleChange}
                  className="-ml-2 w-[25.9rem] border bg-slate-50 border-slate-400 p-2 rounded outline-none indent-2"
                />
              </div>
            </div>

            <div className="grid mt-3">
              <label>
                Password <span className="text-red-600">*</span>
              </label>

              <div className="bg-slate-50 p-2">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={data.password}
                  required
                  onChange={handleChange}
                  className="-ml-2 w-[25.9rem] border bg-slate-50 border-slate-400 p-2 rounded outline-none indent-2"
                />
              </div>
            </div>

            <div className="grid mt-3">
              <label>
                Confirm Password <span className="text-red-600">*</span>
              </label>

              <div className="bg-slate-50 p-2">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  required
                  onChange={handleChange}
                  className="-ml-2 w-[25.9rem] border bg-slate-50 border-slate-400 p-2 rounded outline-none indent-2"
                />
              </div>
            </div>

            <div className="grid">
              <label>
                Telephone <span className="text-red-600">*</span>
              </label>
              <div className="bg-slate-50 p-2 flex w-[50rem]">
                <input
                  type="number"
                  placeholder="Telephone"
                  name="phone"
                  value={data.phone}
                  onChange={handleChange}
                  required
                  className="-ml-2 w-[25.9rem] border bg-slate-50 border-slate-400 p-2 rounded outline-none indent-2"
                />
              </div>
            </div>

            <button className="bg-blue-800 w-[25.9rem] text-white px-6 py-2 w-fulltransition-all text-center rounded-[5px] block mt-6 pcBuilder cursor-pointer hover:bg-blue-500">
              Continue
            </button>
          </form>

          <p className="mb-12 text-center items-center mt-5 w-full">
            <div className="flex w-full">
              <p className="w-[80px] h-[0.1px] bg-slate-300 mt-3"></p>
              <p className="">Already have an account?</p>
              <p className="w-[80px] h-[0.1px] bg-slate-300 mt-3"></p>
            </div>
          </p>

          <p className="-mt-5 w-[130%]">
            If you already have an account with us, please login at the
          </p>
          <Link
            to={"/login"}
            className="text-red-500 hover:underline cursor-pointer"
          >
            Login Page
          </Link>
        </div>
      </div>

      <div>
        {/* <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto rounded">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcons} alt="login icons" />
            </div>

            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer  text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label> Name : </label>
              <div className="bg-slate-50 p-2">
                <input
                  type="text"
                  placeholder="enter your name.."
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="grid">
              <label> Email : </label>
              <div className="bg-slate-50 p-2">
                <input
                  type="email"
                  placeholder="enter email.."
                  name="email"
                  value={data.email}
                  required
                  onChange={handleChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label> Password : </label>
              <div className="bg-slate-50 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />

                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <IoEye /> : <IoMdEyeOff />}</span>
                </div>
              </div>
            </div>

            <div>
              <label> Confirm Password : </label>
              <div className="bg-slate-50 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="enter confirm password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  className="w-full h-full outline-none bg-transparent"
                />

                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <span>
                    {showConfirmPassword ? <IoEye /> : <IoMdEyeOff />}
                  </span>
                </div>
              </div>
            </div>

            <button className="bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-500">
              Sign Up
            </button>
          </form>

          <p className="my-5">
            Already have account ?{" "}
            <Link
              to={"/login"}
              className="text-red-600 hover:underline hover:text-red-700"
            >
              Login
            </Link>
          </p>
        </div>
      </div> */}
      </div>
    </section>
  );
};

export default SignUp;
