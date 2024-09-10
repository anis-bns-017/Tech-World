import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import googlePlay from "../assest/banner/google-play.png";
import appStore from "../assest/banner/app-store.jpg";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-slate-900 w-full h-[71vh] relative">
      <div className="container mx-auto p-2 flex">
        <div className="w-[25%]">
          <div className="text-white font-semibold tracking-[6px] uppercase mb-5 mt-10">
            support
          </div>

          <div className="mt-10">
            <div className="flex cursor-pointer items-center w-[42vh]  text-white h-16 rounded-full p-5 border-[1.5px] border-slate-700 hover:border-red-500">
              <div className="text-[3vh] text-white">{<FaPhone />}</div>
              <div className="w-[1px] h-8 ml-6 bg-slate-700"></div>
              <div className="ml-4">
                <p className="text-sm">10AM - 7PM</p>
                <p className="font-semibold text-xl text-red-600">16793</p>
              </div>
            </div>

            <div className="flex cursor-pointer w-[42vh] items-center text-white h-16 rounded-full p-5 border-[1.5px] hover:border-red-500 border-slate-700 mt-5">
              <div className="text-[3vh] text-white">{<FaLocationDot />}</div>
              <div className="w-[1px] h-8 ml-6 bg-slate-700"></div>
              <div className="ml-4">
                <p className="text-sm">Store Locator</p>
                <p className="font-semibold text-xl text-red-600">
                  Find Our Stores
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[18%]" title="Youtube Here">
          <div className="text-white font-semibold tracking-[6px] uppercase mb-5 mt-10">
            about us
          </div>
          <div className="text-sm leading-10">
            <p className="text-slate-500 hover:underline hover:text-red-500 cursor-pointer">
              EMI Terms
            </p>
            <p className="text-slate-500 hover:underline hover:text-red-500 cursor-pointer">
              Privacy Policy
            </p>
            <p className="text-slate-500 hover:underline hover:text-red-500 cursor-pointer">
              Star Point Policy
            </p>
            <p className="text-slate-500 hover:underline hover:text-red-500 cursor-pointer">
              Contact Us
            </p>
          </div>
        </div>

        <div className="w-[18%] mt-[85px]">
          <div className="text-sm leading-10">
            <p className="text-slate-500 hover:underline hover:text-red-500 cursor-pointer">
              About Us
            </p>
            <p className="text-slate-500 hover:underline hover:text-red-500 cursor-pointer">
              Terms and Condition
            </p>
            <p className="text-slate-500 hover:underline hover:text-red-500 cursor-pointer">
              Career
            </p>
            <p className="text-slate-500 hover:underline hover:text-red-500 cursor-pointer">
              Brands Us
            </p>
          </div>
        </div>

        <div className="w-[18%] mt-[85px]">
          <div className="text-sm leading-10">
            <p className="text-slate-500 hover:underline hover:text-red-500 cursor-pointer">
              Online Delivery
            </p>
            <p className="text-slate-500 hover:underline hover:text-red-500 cursor-pointer">
              Refunc and Return Policy
            </p>
            <p className="text-slate-500 hover:underline hover:text-red-500 cursor-pointer">
              Blog
            </p>
          </div>
        </div>

        <div className=" w-[25%]">
          <div className="text-white font-semibold tracking-[6px] uppercase mb-5 mt-10">
            stay connected
          </div>
          <div className="leading-8">
            <h2 className="text-white text-sm">Tech World Ltd</h2>
            <div className="text-sm mt-5">
              <p className="text-slate-500">
                Head Office: 28 Kazi Nazrul Islam
              </p>
              <p className="text-slate-500">
                Ave,Navana Zohura Square, Dhaka 1000
              </p>
              <p className="text-slate-500 mt-6">Email:</p>
              <p className="text-red-600 mt-2 cursor-pointer hover:underline">
                webteam@techworldbd.com:
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="justify-between">
        <div className="mt-10 w-[197vh] mx-16 justify-between text-slate-500 h-16 p-5 border-[0.01px] border-slate-500 border-l-transparent border-r-transparent">
          <p className="-ml-5 text-sm">
            Experience Tech World App on your mobile:
          </p>

          <div className="flex ml-[43vh] -mt-[42px] gap-1">
            <div className="">
              <img
                className="h-16 w-22 mix-blend-multiply p-2 rounded-[8px] cursor-pointer"
                src={googlePlay}
                alt=""
              />
            </div>
            <img
              className="h-16 w-22 mix-blend-multiply p-2 rounded-[8px] cursor-pointer"
              src={appStore}
              alt=""
            />
          </div>

          <div className="text-white -mt-[50px] items-center flex float-right gap-3">
            <div className="text-white text-2xl cursor-pointer p-2 bg-slate-700 rounded-full">
              <FaFacebookF />
            </div>
            <div className="text-white text-2xl cursor-pointer p-2 bg-slate-700 rounded-full">
              <FaYoutube />
            </div>
            <div className="text-white text-2xl cursor-pointer p-2 bg-slate-700 rounded-full">
              <FaSquareInstagram />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-7 ml-16">
        <p className="text-slate-500 text-sm items-center ">
          © 2024 Tech World Ltd | All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
