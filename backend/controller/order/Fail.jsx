import React from "react";
import { useNavigate } from "react-router-dom";
import fail from "../../../frontend/src/assest/fail.png";
const Success = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="w-full h-screen bg-slate-200">
      <div className="">
        <div className="flex justify-center items-center h-full p-10">
          <img src={fail} alt="Check Icon" height={50} width={180} />
        </div>
      </div>
      <div className="h-[200rem]  justify-center text-center">
        <div className="text-5xl mt-5 font-bold text-center justify-center">
          Your Payment failed!!!
        </div>
        <div className="text-xl mt-5 font-md text-slate-600 text-center justify-center">
          Your Payment failed!!!
        </div>
        <div>
          <button
            onClick={handleClick}
            className="bg-blue-700 rounded-md font-bold mt-10 p-5 text-xl text-white"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
