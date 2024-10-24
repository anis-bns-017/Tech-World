import { FaUserLarge } from "react-icons/fa6";
import { useSelector } from "react-redux";

const UserCredits = () => {
  const user = useSelector((state) => state?.user?.user);
  return (
    <div className="flex">
      <FaUserLarge className="p-3 bg-slate-200 text-[20vh] h-[15vh] w-[15vh] rounded-full mx-[190px]" />
      <div className="-ml-[10vh] mt-5 flex justify-between">
        <div className="">
          <span className="text-[2vh] -ml-[100px]">Hello,</span> <br />
          <span className="text-[4vh] -ml-[16vh] pt-20 uppercase">{`${user?.firstName}  ${user?.lastName}`}</span>
        </div>

        <div>
          <div className="ml-[70vh] justify-between flex">
            <div className="w-[1px] h-[10vh] bg-slate-400 mx-6"></div>
            <div>
              <span className="">Start Points</span> <br />
              <p className="text-red-800 text-3xl ml-[5vh]">{0}</p>
            </div>
            <div className="w-[1px] h-[10vh] bg-slate-400 mx-6"></div>
            <div>
              <span className="">Store Credit</span> <br />
              <p className="text-red-800 text-3xl ml-[5vh]">{0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCredits;
