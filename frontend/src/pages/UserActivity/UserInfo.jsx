import { MdCollectionsBookmark } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { FaUserEdit } from "react-icons/fa";
import { MdOutlineWifiPassword } from "react-icons/md";
import { ImAddressBook } from "react-icons/im";
import { CiHeart } from "react-icons/ci";
import { FaComputer } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { TbTransactionDollar } from "react-icons/tb";
import { Link, Outlet } from "react-router-dom";
const UserInfo = () => {
  return (
    <>
      <div>
          <div>
            <nav className="ml-[200px] mt-[50px] m-5 flex">
              <Link to={"order"} className="inline-block hover:text-orange-600 hover:bg-slate-50">
                <div className="flex gap-2">
                  <MdCollectionsBookmark className="text-2xl" />
                  <p className="">Order</p>
                </div>
                <div className="w-[13vh] h-[4px] mt-3 bg-slate-300  hover:bg-orange-600"></div>
              </Link>

              <Link to={"quotes"} className="inline-block hover:text-orange-600 hover:bg-slate-50">
                <div className="flex gap-2">
                  <CgNotes className="text-2xl" />
                  <p>Quotes</p>
                </div>
                <div className="w-[15vh] h-[4px] mt-3 bg-slate-300  hover:bg-orange-600"></div>
              </Link>

              <Link
                to={"edit"}
                className="inline-block hover:text-orange-600 hover:bg-slate-50"
              >
                <div className="flex gap-2">
                  <FaUserEdit className="text-2xl" />
                  <p>Edit Account</p>
                </div>
                <div className="w-[21vh] h-[4px] mt-3 bg-slate-300 hover:bg-orange-600"></div>
              </Link>

              <Link
                to={"edit-password"}
                className="inline-block hover:text-orange-600 hover:bg-slate-50"
              >
                <div className="flex gap-2">
                  <MdOutlineWifiPassword className="text-2xl" />
                  <p>Password</p>
                </div>
                <div className="w-[17vh] h-[4px] mt-3 bg-slate-300 hover:bg-orange-600"></div>
              </Link>

              <Link to={"address"} className="inline-block hover:text-orange-600 hover:bg-slate-50">
                <div className="flex gap-2">
                  <ImAddressBook className="text-2xl" />
                  <p>Addresses</p>
                </div>
                <div className="w-[17vh] h-[4px] mt-3 bg-slate-300  hover:bg-orange-600"></div>
              </Link>

              <Link className="inline-block hover:text-orange-600 hover:bg-slate-50">
                <div className="flex gap-2">
                  <CiHeart className="text-2xl" />
                  <p>Saved List</p>
                </div>
                <div className="w-[18vh] h-[4px] mt-3 bg-slate-300  hover:bg-orange-600"></div>
              </Link>

              <Link className="inline-block hover:text-orange-600 hover:bg-slate-50">
                <div className="flex gap-2">
                  <FaComputer className="text-2xl" />
                  <p>Saved PC</p>
                </div>
                <div className="w-[16vh] h-[4px] mt-3 bg-slate-300  hover:bg-orange-600"></div>
              </Link>

              <Link className="inline-block hover:text-orange-600 hover:bg-slate-50">
                <div className="flex gap-2">
                  <FaStar className="text-2xl" />
                  <p>Star Points</p>
                </div>
                <div className="w-[19vh] h-[4px] mt-3 bg-slate-300  hover:bg-orange-600"></div>
              </Link>

              <Link className="inline-block hover:text-orange-600 hover:bg-slate-50">
                <div className="flex gap-2">
                  <TbTransactionDollar className="text-2xl" />
                  <p>Store Credit</p>
                </div>
                <div className="w-[19vh] h-[4px] mt-3 bg-slate-300  hover:bg-orange-600"></div>
              </Link>
            </nav>
          </div>
        <main className="w-full h-full p-2">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default UserInfo;
