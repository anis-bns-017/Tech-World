import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { ImSearch } from "react-icons/im";

import image1 from "../assest/banner/img1.webp";
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import career from "../assest/banner/career.png";

import image1Mobile from "../assest/banner/img1_mobile.jpg";
import image2Mobile from "../assest/banner/img2_mobile.webp";
import image3Mobile from "../assest/banner/img3_mobile.jpg";
import image4Mobile from "../assest/banner/img4_mobile.jpg";
import image5Mobile from "../assest/banner/img5_mobile.png";

import banner1 from "../assest/banner/logitechdoubledeal.webp";
import banner2 from "../assest/banner/happy-hour.webp";
import { useEffect, useState } from "react";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const desktopImages = [banner1, banner2, image1, image2];
  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const previousImage = () => {
    if (currentImage != 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <>
      <div className="flex">
        <div className="container mb-10 px-10 rounded">
          <div className="h-[32rem] w-[60rem] bg-slate-200 relative">
            {/* Desktop and Tablet version */}
            <div className="hidden md:flex h-full w-full overflow-hidden">
              {desktopImages.map((imageUrl, index) => {
                return (
                  <div
                    className="w-full h-full min-h-full min-w-full transition-all"
                    key={imageUrl}
                    style={{ transform: `translateX(-${currentImage * 100}%)` }}
                  >
                    <img src={imageUrl} alt="" className="w-full h-full" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="grid">
          <div>
            <div className="h-[18rem] w-[20rem] bg-[#ffe8a1] mr-20 shadow-lg p-3 items-center text-center">
              <p className="text-lg font-semibold mt-3">Compare Products</p>
              <p className="text-sm text-yellow-800">
                Choose Two Prodcuts to Compare
              </p>
              <form className="">
                <div className="flex">
                  <input
                    className="absolute mt-8 w-64 h-10 mx-5 outline-none indent-4 shadow-md rounded"
                    type="text"
                    placeholder="Search and Select Product"
                  />
                  <ImSearch className="relative ml-[15.5rem] text-slate-400 mt-[45px]" />
                </div>
                <div className="flex mt-6">
                  <input
                    className="absolute w-64 h-10 mx-5 outline-none indent-4 shadow-md rounded"
                    type="text"
                    placeholder="Search and Select Product"
                  />
                  <ImSearch className="relative ml-[15.5rem] text-slate-400 mt-[15px]" />
                </div>
                <div className="rounded p-2 mx-5 mt-10 border-[2px] bg-transparent text-blue-700 border-blue-700 pcBuilder cursor-pointer">
                  <div>
                    <button className="w-full hover:text-white">View Comparison</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div>
            <img className="cursor-pointer h-[12rem] w-[20rem]" src={career} alt="" />
          </div>
        </div>
      </div>

      {/* Mobile version */}
      {/* <div className="flex h-full w-full overflow-hidden md:hidden">
            {mobileImages.map((imageUrl, index) => {
              return (
                <div
                  className="w-full h-full min-h-full min-w-full transition-all"
                  key={imageUrl}
                  style={{ transform: `translateX(-${currentImage * 100}%)` }}
                >
                  <img
                    src={imageUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}
          </div> */}
    </>
  );
};

export default BannerProduct;
