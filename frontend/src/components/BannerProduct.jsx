import image1 from "../assest/banner/img1.webp";
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";

import image1Mobile from "../assest/banner/img1_mobile.jpg";
import image2Mobile from "../assest/banner/img2_mobile.webp";
import image3Mobile from "../assest/banner/img3_mobile.jpg";
import image4Mobile from "../assest/banner/img4_mobile.jpg";
import image5Mobile from "../assest/banner/img5_mobile.png";

import { FaAngleLeft } from "react-icons/fa";

const BannerProduct = () => {
  const desktopImages = [image1, image2, image3, image4, image5];
  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];
  
  return (
    <div className="container mt-auto px-4 rounded">
      <div className="h-72 w-full bg-slate-200">
        <div className="flex h-full w-full">
          {desktopImages.map((imageUrl) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full translate"
                key={imageUrl}
                style={{ transform: `translateX(-200%)` }}
              >
                <img src={imageUrl} alt="" className="w-full h-full" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
