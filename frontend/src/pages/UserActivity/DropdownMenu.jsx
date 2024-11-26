import { AnimatePresence, transform } from "framer-motion";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const DropdownMenu = () => {
  return (
    <div className="flex gap-[10px] text-[15px] mx-11 mt-3 text-center items-center absolute">
      <FlyoutLink href="#" FlyoutContent={PricingContent}>
        Desktop
      </FlyoutLink>
      {/* <FlyoutLink href="#" FlyoutContent={PricingContent}>
        Laptop
      </FlyoutLink>
      <FlyoutLink href="#" FlyoutContent={PricingContent}>
        Component
      </FlyoutLink>
      <FlyoutLink href="#" FlyoutContent={PricingContent}>
        Monitor
      </FlyoutLink>
      <FlyoutLink href="#" FlyoutContent={PricingContent}>
        UPS
      </FlyoutLink>
      <FlyoutLink href="#" FlyoutContent={PricingContent}>
        Phone
      </FlyoutLink>
      <FlyoutLink href="#" FlyoutContent={PricingContent}>
        Laptop
      </FlyoutLink>

      <FlyoutLink href="#" FlyoutContent={PricingContent}>
        Tablet
      </FlyoutLink>
      <FlyoutLink href="#" FlyoutContent={PricingContent}>
        Office Equipment
      </FlyoutLink>
      <FlyoutLink href="#" FlyoutContent={PricingContent}>
        Camera
      </FlyoutLink>
      <FlyoutLink href="#" FlyoutContent={PricingContent}>
        Security
      </FlyoutLink>
      <FlyoutLink href="#" FlyoutContent={PricingContent}>
        Networking
      </FlyoutLink>

      <FlyoutLink href="#" FlyoutContent={PricingContent}>
        Software
      </FlyoutLink>
      <FlyoutLink href="#" FlyoutContent={PricingContent}>
        Server & Storage
      </FlyoutLink>
      <FlyoutLink href="#" FlyoutContent={PricingContent}>
        Accesories
      </FlyoutLink>
      <FlyoutLink href="#" FlyoutContent={PricingContent}>
        Gadget
      </FlyoutLink>
      <FlyoutLink href="#" FlyoutContent={PricingContent}>
        Gaming
      </FlyoutLink>
      <FlyoutLink href="#" FlyoutContent={PricingContent}>
        TV
      </FlyoutLink>
      <FlyoutLink href="#" FlyoutContent={PricingContent}>
        Appliance
      </FlyoutLink> */}
    </div>
  );
};

const FlyoutLink = ({ children, href, FlyoutContent }) => {
  const [open, setOpen] = useState(false);
  const showFlyout = open && FlyoutContent;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative group h-fit w-fit"
    >
      <a href={href} className="relative cursor-pointer hover:text-red-500 text-black">
        {children}
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute w-full -bottom-2 origin-left right-[10px] h-1 rounded-full bg-blue-800 transition-transform duration-300 ease-out"
        ></span>
      </a>

      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ x: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 bg-white text-black"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent"></div>
            {/* <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-red-400"></div> */}
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PricingContent = () => {
  return (
    <div className="w-[35vh] bg-slate-200 rounded-sm p-6 shadow-xl">
      <div className="text-[15px] mt-3 text-center items-center">
        <div>
          <Link
            to={"upload-desktop"}
            className="cursor-pointer hover:text-red-500"
          >
            Desktop
          </Link>
        </div>
        <div>
          <Link
            to={"upload-laptop"}
            className="cursor-pointer hover:text-red-500"
          >
            Laptop
          </Link>
        </div>

        <div>
          <Link className="cursor-pointer hover:text-red-500">Compoenent</Link>
        </div>
        <div>
          <Link
            to={"upload-monitor"}
            className="cursor-pointer hover:text-red-500"
          >
            Monitor
          </Link>
        </div>
        <div>
          <Link className="cursor-pointer hover:text-red-500">UPS</Link>
        </div>
        <div>
          <Link
            to={"upload-phone"}
            className="cursor-pointer hover:text-red-500"
          >
            Phone
          </Link>
        </div>
        <div>
          <div>
            <Link
              to={"upload-tablet"}
              className="cursor-pointer hover:text-red-500"
            >
              Tablet
            </Link>
          </div>
        </div>
        <div>
          <div>
            <Link className="cursor-pointer hover:text-red-500">
              Office equipment
            </Link>
          </div>
        </div>
        <div>
          <Link
            to={"upload-camera"}
            className="cursor-pointer hover:text-red-500"
          >
            Camera
          </Link>
        </div>

        <div>
          <Link
            to={"upload-mouse"}
            className="cursor-pointer hover:text-red-500"
          >
            Mouse
          </Link>
        </div>
        <div>
          <Link className="cursor-pointer hover:text-red-500">Networking</Link>
        </div>
        <div>
          <Link className="cursor-pointer hover:text-red-500">Software</Link>
        </div>
        <div>
          <Link className="cursor-pointer hover:text-red-500">
            Server & Storage
          </Link>
        </div>
        <div>
          <Link className="cursor-pointer hover:text-red-500">Accessories</Link>
        </div>
        <div>
          <Link className="cursor-pointer hover:text-red-500">Gadget</Link>
        </div>
        <div>
          <Link className="cursor-pointer hover:text-red-500">Gaming</Link>
        </div>
        <div>
          <Link className="cursor-pointer hover:text-red-500">TV</Link>
        </div>
        <div>
          <Link className="cursor-pointer hover:text-red-500">Appliance</Link>
        </div>
      </div>
    </div>
  );
};

{
  /* <Sidebar />
      <div>Main Content</div> */
}

export default DropdownMenu;
