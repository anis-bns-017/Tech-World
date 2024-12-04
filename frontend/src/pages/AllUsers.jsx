import { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";
import { useSelector } from "react-redux";

const AllUsers = () => {
  const user = useSelector((state) => state?.user?.user);
  console.log("Your ROle: ", user);

  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    _id: "",
  });

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();
    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="pb-4 bg-white">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            {user?.role === "ADMIN" && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {allUsers.map((el, index) => {
            if (user?.role === "ADMIN" && el?.role != "ADMIN") {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{el?.firstName + " " + el?.lastName}</td>
                  <td>{el?.email}</td>
                  <td>{el?.role}</td>
                  <td>{moment(el?.createdAt).format("LL")}</td>
                  <td>
                    <button
                      onClick={() => {
                        setUpdateUserDetails(el);
                        setOpenUpdateRole(true);
                      }}
                      className="bg-green-300 p-2 rounded-full cursor-pointer hover:bg-green-400"
                    >
                      <MdEdit />
                    </button>
                  </td>
                </tr>
              );
            } else if (user?.role === "SELLER" && el?.role === "GENERAL") {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{el?.firstName + " " + el?.lastName}</td>
                  <td>{el?.email}</td>
                  <td>{el?.role}</td>
                  <td>{moment(el?.createdAt).format("LL")}</td>
                  {user?.role === "ADMIN" && (
                    <td>
                      <button
                        onClick={() => {
                          setUpdateUserDetails(el);
                          setOpenUpdateRole(true);
                        }}
                        className="bg-green-300 p-2 rounded-full cursor-pointer hover:bg-green-400"
                      >
                        <MdEdit />
                      </button>
                    </td>
                  )}
                </tr>
              );
            }
          })}
        </tbody>
      </table>

      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          firstName={updateUserDetails.firstName}
          lastName={updateUserDetails.lastName}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
