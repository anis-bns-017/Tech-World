import { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/Role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <div className="min-h-[calc(140vh-120px)] md:flex hidden">
        <aside className="bg-white min-h-full w-full max-w-60 customShadow">
          <div className="h-32 bg-red-500 flex justify-center items-center flex-col">
            <div className="text-5xl cursor-pointer relative flex justify-center">
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-20 h-20 rounded-full"
                  alt={user?.name}
                />
              ) : (
                <FaUser />
              )}
            </div>

            <p className="capitalize text-lg font-semibold"> {user?.name} </p>
            <p className="text-sm"> {user?.role} </p>
          </div>

          <div>
            {/* //Navigation  */}
            <nav className="grid">
              <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-50">
                All users
              </Link>
              <Link
                to={"all-products"}
                className="px-2 py-1 hover:bg-slate-50"
              >
                All Products
              </Link>
            </nav>
          </div>
        </aside>

        <main className="w-full h-full p-2">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminPanel;
