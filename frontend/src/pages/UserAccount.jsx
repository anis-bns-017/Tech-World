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

const UserAccount = () => {
  const user = useSelector((state) => state?.user?.user);

  console.log(user);

  return (
    <div>
      <div className="flex">
        <FaUserLarge className="p-5 bg-slate-200 text-[20vh] rounded-full mx-[190px]" />
        <div className="-ml-[10vh] mt-5">
          <span className="text-[3vh] -ml-[100px]">Hello,</span> <br/>
          <span className="text-[30px] -ml-[16vh] pt-20 uppercase">{`${user?.firstName}  ${user?.lastName}`}</span>
        </div>
      </div>
      <section className="flex flex-wrap mx-[150px] scrollbar-none p-10">
        <div className="w-[37vh] h-[24vh] rounded-md shadow-md border-blue-700 transition-all hover:border-[1px] bg-white m-1">
          <div className="text-center justify-self-center mt-12">
            <MdCollectionsBookmark className="ml-[15vh] p-3 rounded-full bg-slate-300 text-[45px]" />
            Order
          </div>
        </div>
        <div className="w-[37vh] h-[24vh] rounded-md shadow-md border-blue-700 transition-all hover:border-[1px] bg-white m-1">
          <div className="text-center justify-self-center mt-12">
            <CgNotes className="ml-[15vh] p-3 rounded-full bg-slate-300 text-[45px]" />
            Quote
          </div>
        </div>

        <div className="w-[37vh] h-[24vh] rounded-md shadow-md border-blue-700 transition-all hover:border-[1px] bg-white m-1">
          <div className="text-center justify-self-center mt-12">
            <FaUserEdit className="ml-[15vh] p-3 rounded-full bg-slate-300 text-[45px]" />
            Edit Profile
          </div>
        </div>

        <div className="w-[37vh] h-[24vh] rounded-md shadow-md border-blue-700 transition-all hover:border-[1px] bg-white m-1">
          <div className="text-center justify-self-center mt-12">
            <MdOutlineWifiPassword className="ml-[15vh] p-3 rounded-full bg-slate-300 text-[45px]" />
            Change Password
          </div>
        </div>

        <div className="w-[37vh] h-[24vh] rounded-md shadow-md border-blue-700 transition-all hover:border-[1px] bg-white m-1">
          <div className="text-center justify-self-center mt-12">
            <ImAddressBook className="ml-[15vh] p-3 rounded-full bg-slate-300 text-[45px]" />
            Addresses
          </div>
        </div>

        <div className="w-[37vh] h-[24vh] rounded-md shadow-md border-blue-700 transition-all hover:border-[1px] bg-white m-1">
          <div className="text-center justify-self-center mt-12">
            <CiHeart className="ml-[15vh] p-3 rounded-full bg-slate-300 text-[45px]" />
            Wish List
          </div>
        </div>

        <div className="w-[37vh] h-[24vh] rounded-md shadow-md border-blue-700 transition-all hover:border-[1px] bg-white m-1">
          <div className="text-center justify-self-center mt-12">
            <FaComputer className="ml-[15vh] p-3 rounded-full bg-slate-300 text-[45px]" />
            Saved PC
          </div>
        </div>

        <div className="w-[37vh] h-[24vh] rounded-md shadow-md border-blue-700 transition-all hover:border-[1px] bg-white m-1">
          <div className="text-center justify-self-center mt-12">
            <FaStar className="ml-[15vh] p-3 rounded-full bg-slate-300 text-[45px]" />
            Star Points
          </div>
        </div>

        <div className="w-[37vh] h-[24vh] rounded-md shadow-md border-blue-700 transition-all hover:border-[1px] bg-white m-1">
          <div className="text-center justify-self-center mt-12">
            <TbTransactionDollar className="ml-[15vh] p-3 rounded-full bg-slate-300 text-[45px]" />
            Your Transactions
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserAccount;
