import { useSelector } from "react-redux";
import UserCredits from "./UserActivity/UserCredits";
import UserInfo from "./UserActivity/UserInfo";
import ROLE from "../common/Role";
import AdminPanel from "./AdminPanel";

const UserAccount = () => {
  const user = useSelector((state) => state?.user?.user);
  console.log("user ", user?.role);
  // user?.role === ROLE.ADMIN
  return (
    <>
      <div>
        {user?.role === ROLE.ADMIN ? (
          <AdminPanel />
        ) : (
          <div>
            <UserCredits />
            <UserInfo />
          </div>
        )}

        {/* <nav>
          <section className="flex flex-wrap mx-[150px] scrollbar-none p-10">
            <Link
              to={"/account/order"}
              className="w-[37vh] h-[24vh] rounded-md shadow-md border-blue-700 transition-all hover:border-[1px] bg-white m-1 cursor-pointer"
            >
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

            <Link
              to={"edit"}
              className="w-[37vh] h-[24vh] rounded-md shadow-md border-blue-700 transition-all hover:border-[1px] bg-white m-1 cursor-pointer"
            >
              <div className="text-center justify-self-center mt-12">
                <FaUserEdit className="ml-[15vh] p-3 rounded-full bg-slate-300 text-[45px]" />
                Edit Profile
              </div>
            </Link>

            <Link
              to={"edit-password"}
              className="w-[37vh] h-[24vh] rounded-md shadow-md border-blue-700 transition-all hover:border-[1px] bg-white m-1 cursor-pointer"
            >
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

            <Link className="w-[37vh] h-[24vh] rounded-md shadow-md border-blue-700 transition-all hover:border-[1px] bg-white m-1 cursor-pointer">
              <div className="text-center justify-self-center mt-12">
                <TbTransactionDollar className="ml-[15vh] p-3 rounded-full bg-slate-300 text-[45px]" />
                Your Transactions
              </div>
            </Link>
          </section>
          <main className="w-full h-full p-2">
            <Outlet />
          </main>
        </nav> */}
      </div>
    </>
  );
};

export default UserAccount;
