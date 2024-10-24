import { MdCollectionsBookmark } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { FaUserEdit } from "react-icons/fa";
import { MdOutlineWifiPassword } from "react-icons/md";
import { ImAddressBook } from "react-icons/im";
import { CiHeart } from "react-icons/ci";
import { FaComputer } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { TbTransactionDollar } from "react-icons/tb";
import { FaUserLarge } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useState } from "react";
import UserCredits from "./UserActivity/UserCredits";
import { Link } from "react-router-dom";
import UserInfo from "./UserActivity/UserInfo";

const UserAccount = () => {
  // // const user = useSelector((state) => state?.user?.user);
  const [flag, setFlag] = useState(true);

  // console.log(user);

  return (
    <>
      <div>
        <UserCredits />
        <section className="flex flex-wrap mx-[150px] scrollbar-none p-10">
          <Link to={"/account/order"} className="w-[37vh] h-[24vh] rounded-md shadow-md border-blue-700 transition-all hover:border-[1px] bg-white m-1 cursor-pointer">
            <div className="text-center justify-self-center mt-12">
              <MdCollectionsBookmark className="ml-[15vh] p-3 rounded-full bg-slate-300 text-[45px]" />
              Order
            </div>
          </Link>
          <Link className="w-[37vh] h-[24vh] rounded-md shadow-md border-blue-700 transition-all hover:border-[1px] bg-white m-1 cursor-pointer">
            <div className="text-center justify-self-center mt-12">
              <CgNotes className="ml-[15vh] p-3 rounded-full bg-slate-300 text-[45px]" />
              Quote
            </div>
          </Link>

          <Link to={"/account/edit"} className="w-[37vh] h-[24vh] rounded-md shadow-md border-blue-700 transition-all hover:border-[1px] bg-white m-1 cursor-pointer">
            <div className="text-center justify-self-center mt-12">
              <FaUserEdit className="ml-[15vh] p-3 rounded-full bg-slate-300 text-[45px]" />
              Edit Profile
            </div>
          </Link>

          <Link className="w-[37vh] h-[24vh] rounded-md shadow-md border-blue-700 transition-all hover:border-[1px] bg-white m-1 cursor-pointer">
            <div className="text-center justify-self-center mt-12">
              <MdOutlineWifiPassword className="ml-[15vh] p-3 rounded-full bg-slate-300 text-[45px]" />
              Change Password
            </div>
          </Link>

          <Link className="w-[37vh] h-[24vh] rounded-md shadow-md border-blue-700 transition-all hover:border-[1px] bg-white m-1 cursor-pointer">
            <div className="text-center justify-self-center mt-12">
              <ImAddressBook className="ml-[15vh] p-3 rounded-full bg-slate-300 text-[45px]" />
              Addresses
            </div>
          </Link>

          <Link className="w-[37vh] h-[24vh] rounded-md shadow-md border-blue-700 transition-all hover:border-[1px] bg-white m-1 cursor-pointer">
            <div className="text-center justify-self-center mt-12">
              <CiHeart className="ml-[15vh] p-3 rounded-full bg-slate-300 text-[45px]" />
              Wish List
            </div>
          </Link>

          <Link className="w-[37vh] h-[24vh] rounded-md shadow-md border-blue-700 transition-all hover:border-[1px] bg-white m-1 cursor-pointer">
            <div className="text-center justify-self-center mt-12">
              <FaComputer className="ml-[15vh] p-3 rounded-full bg-slate-300 text-[45px]" />
              Saved PC
            </div>
          </Link>

          <Link className="w-[37vh] h-[24vh] rounded-md shadow-md border-blue-700 transition-all hover:border-[1px] bg-white m-1 cursor-pointer">
            <div className="text-center justify-self-center mt-12">
              <FaStar className="ml-[15vh] p-3 rounded-full bg-slate-300 text-[45px]" />
              Star Points
            </div>
          </Link>

          <Link
            onClick={(prev) => setFlag(!prev)}
            className="w-[37vh] h-[24vh] rounded-md shadow-md border-blue-700 transition-all hover:border-[1px] bg-white m-1 cursor-pointer"
          >
            <div className="text-center justify-self-center mt-12">
              <TbTransactionDollar className="ml-[15vh] p-3 rounded-full bg-slate-300 text-[45px]" />
              Your Transactions
            </div>
          </Link>
        </section>
      </div>
    </>
  );
};

export default UserAccount;
