import { ImSearch } from "react-icons/im";

import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { FaCartPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import { useContext, useState } from "react";

import tech2 from "../assest/banner/tech2.png";
import Context from "../context/Context";
import { MdOutlineCardGiftcard } from "react-icons/md";
import { SlEnergy } from "react-icons/sl";
import { FaUserAlt } from "react-icons/fa";
import DropDown from "../dropMenu/DropDown";
import NavBar from "./NavBar";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();

  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const [search, setSearch] = useState(searchInput?.search?.split("=")[1]);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/");
    }
  };

  return (
    <header className="">
      <div className="h-[100px] shadow-md bg-black z-40 w-full">
        <div className="flex justify-between items-center h-full container ml-10 pl-4 text-white">
          <div className="">
            <Link to={"/"}>
              <img className="" src={tech2} height={50} width={180} />
            </Link>
          </div>

          <div className="mx-7 hidden lg:flex items-center w-[450px] max-w-[70.5vh] h-8 justify-between outline-none focus-within:shadow-md pl-2">
            <input
              type="text"
              placeholder="Search"
              className="w-full text-black h-10 text-sm outline-none p-2 rounded-l-md indent-3"
              onChange={handleSearch}
              value={search}
            />

            <div className="text-lg min-w-[45px] h-10 bg-white flex items-center justify-center p-2 border-none outline-none rounded-r-md text-black">
              <ImSearch />
            </div>
          </div>

          <div className="flex items-center">
            <div className="text-red-600 text-2xl cursor-pointer">
              <MdOutlineCardGiftcard />
            </div>
            <div className="ml-4 text-white">
              <h5 className="text-[15px] cursor-pointer">Offers</h5>
              <p className="text-slate-400 text-[11px] cursor-pointer">
                Latest Offers
              </p>
            </div>
          </div>

          <div className="ml-6 blink-icon text-[23px] outline-none cursor-pointer">
            <SlEnergy />
          </div>

          <div className="px-5">
            <div>
              <h5 className="text-[15px] cursor-pointer">Happy Hour</h5>
              <p className="text-slate-400 text-[11px] cursor-pointer">
                Special Deals
              </p>
            </div>
          </div>

          {!user?._id && (
            <div className="flex items-center">
              <div className="text-red-500 cursor-pointer">
                <FaUserAlt />
              </div>
              <div className="pl-4">
                <h5 className="text-[15px] cursor-pointer">Account</h5>
                <div className="flex gap-1">
                  <Link
                    className="text-slate-400 text-[11px] cursor-pointer hover:text-red-500"
                    to={"/sign-up"}
                  >
                    Register
                  </Link>
                  <p className="text-slate-400 text-[11px]">or</p>
                  <Link
                    to={"/login"}
                    className="text-slate-400 text-[11px] cursor-pointer hover:text-red-500"
                  >
                    login
                  </Link>
                </div>
              </div>
            </div>
          )}

          {user?._id && (
            <div className="flex items-center">
              <div className="text-red-500 cursor-pointer">
                <FaUserAlt />
              </div>
              <div className="pl-4">
                <h5 className="text-[15px] cursor-pointer">Account</h5>
                <div className="flex gap-1">
                  <Link
                    to={"/account"}
                    className="text-slate-400 text-[11px] cursor-pointer hover:text-red-500"
                  >
                    Profile
                  </Link>
                  <p className="text-slate-400 text-[11px]">or</p>
                  <p
                    className="text-slate-400 text-[11px] cursor-pointer hover:text-red-500"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* <div className="rounded bg-blue-600 p-2 ml-6 pcBuilder cursor-pointer]">
            <div>
              <button className="w-[100px]">PC Builder</button>
            </div>
          </div> */}

          {user?._id && user?.role === "GENERAL" && (
            <Link to={"/cart"} className="text-2xl relative">
              <span>
                <FaCartPlus />
              </span>

              <div>
                <p className="text-sm bg-blue-600 w-4 h-4 rounded text-yellow-100 p-2 flex items-center justify-center absolute -top-3 -right-4">
                  {context?.cartProductCount}
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>
      <div>{user?.role === "ADMIN" || user?.role === "SELLER" ? <NavBar /> : <DropDown />}</div>
    </header>
  );
};

export default Header;
