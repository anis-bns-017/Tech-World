import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="w-full h-[50px] bg-white relative -mt-3 justify-center items-center">
      <div className="flex gap-3 text-[15px] mx-11 mt-3 text-center items-center absolute">
        <Link
          to={"upload-desktop"}
          className="cursor-pointer hover:text-red-500"
        >
          Desktop
        </Link>
        <Link
          to={"upload-laptop"}
          className="cursor-pointer hover:text-red-500"
        >
          Laptop
        </Link>
        <Link className="cursor-pointer hover:text-red-500">Compoenent</Link>
        <Link
          to={"upload-monitor"}
          className="cursor-pointer hover:text-red-500"
        >
          Monitor
        </Link>
        <Link className="cursor-pointer hover:text-red-500">UPS</Link>
        <Link to={"upload-phone"} className="cursor-pointer hover:text-red-500">
          Phone
        </Link>
        <Link
          to={"upload-tablet"}
          className="cursor-pointer hover:text-red-500"
        >
          Tablet
        </Link>
        <Link className="cursor-pointer hover:text-red-500">
          Office equipment
        </Link>
        <Link
          to={"upload-camera"}
          className="cursor-pointer hover:text-red-500"
        >
          Camera
        </Link>
        <Link className="cursor-pointer hover:text-red-500">Security</Link>
        <Link className="cursor-pointer hover:text-red-500">Networking</Link>
        <Link className="cursor-pointer hover:text-red-500">Software</Link>
        <Link className="cursor-pointer hover:text-red-500">
          Server & Storage{" "}
        </Link>
        <Link className="cursor-pointer hover:text-red-500">Accessories</Link>
        <Link className="cursor-pointer hover:text-red-500">Gadget</Link>
        <Link className="cursor-pointer hover:text-red-500">Gaming</Link>
        <Link className="cursor-pointer hover:text-red-500">TV</Link>
        <Link className="cursor-pointer hover:text-red-500">Appliance</Link>
      </div>
    </div>
  );
};

export default NavBar;