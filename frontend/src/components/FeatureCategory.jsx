import camera from "../assest/FeatureCategory/action-camera.png";
import ac from "../assest/FeatureCategory/air-conditioner.png";
import airpode from "../assest/FeatureCategory/airpods.png";
import controller from "../assest/FeatureCategory/controller.png";
import drone from "../assest/FeatureCategory/drone.png";
import gimbal from "../assest/FeatureCategory/gimbal.png";
import earbuds from "../assest/FeatureCategory/earbuds.png";
import laptopAcsr from "../assest/FeatureCategory/laptop_Accesrs.png";
import laptop from "../assest/FeatureCategory/laptop.png";
import mblAscr from "../assest/FeatureCategory/mbl_Accessories.png";
import powerBank from "../assest/FeatureCategory/power-bank.png";
import mobile from "../assest/FeatureCategory/smartPhone.png";
import watch from "../assest/FeatureCategory/smartwatch.png";
import tv from "../assest/FeatureCategory/tv.png";
import speaker from "../assest/FeatureCategory/speaker.png";
import vr from "../assest/FeatureCategory/virtual-tour.png";
import { Link } from "react-router-dom";

const FeatureCategory = () => {
  return (
    <div>
      <div>
        <div className="items-center justify-center text-center pt-5">
          <h2 className="font-bold text-2xl">Featured Category</h2>
          <p className="mt-3">
            Get Your Desired Product from Featured Category!
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-wrap m-12">
          <div className="w-[150px] h-[130px] max-h-[160px] rounded-[15px] bg-white m-1 my-3 flex items-center justify-center text-center hover:shadow-lg">
            <div className="flex flex-col items-center">
              <img height={50} width={50} src={ac} alt="" />
              <p className="cursor-pointer hover:text-red-500">AC</p>
            </div>
          </div>

          <div className="w-[150px] h-[130px] max-h-[160px] rounded-[15px] bg-white m-1 my-3  flex items-center justify-center text-center hover:shadow-lg">
            <div className="flex flex-col items-center"></div>
            <img height={50} width={50} src={drone} alt="" />
            <p className="hover:text-red-500 cursor-pointer">Drone</p>
          </div>
          <div className="w-[150px] h-[130px] max-h-[160px] rounded-[15px] bg-white m-1 my-3  flex items-center justify-center text-center hover:shadow-lg">
            <div className="flex flex-col items-center">
              <img height={50} width={50} src={gimbal} alt="" />
              <p className="hover:text-red-500 cursor-pointer">Gimbal</p>
            </div>
          </div>
          <div className="w-[150px] h-[130px] max-h-[160px] rounded-[15px] bg-white m-1 my-3  flex items-center justify-center text-center hover:shadow-lg">
            <div className="flex flex-col items-center">
              <img height={50} width={50} src={laptop} alt="" />
              <p className="hover:text-red-500 cursor-pointer">Laptop</p>
            </div>
          </div>
          <div className="w-[150px] h-[130px] max-h-[160px] rounded-[15px] bg-white m-1 my-3  flex items-center justify-center text-center hover:shadow-lg">
            <div className="flex flex-col items-center">
              <img height={50} width={50} src={laptopAcsr} alt="" />
              <p className="hover:text-red-500 cursor-pointer">
                Laptop Accessories
              </p>
            </div>
          </div>
          <div className="w-[150px] h-[130px] max-h-[160px] rounded-[15px] bg-white m-1 my-3  flex items-center justify-center text-center hover:shadow-lg">
            <div className="flex flex-col items-center">
              <img height={50} width={50} src={tv} alt="" />
              <p className="hover:text-red-500 cursor-pointer">Tv</p>
            </div>
          </div>
          <Link
            to={"mobile-phone"}
            className="w-[150px] h-[130px] max-h-[160px] rounded-[15px] bg-white m-1 my-3 flex items-center justify-center text-center hover:shadow-lg"
          >
            <div className="flex flex-col items-center">
              <img height={50} width={50} src={mobile} alt="Mobile Icon" />
              <p className="hover:text-red-500 cursor-pointer">Mobile Phone</p>
            </div>
          </Link>

          <div className="w-[150px] h-[130px] max-h-[160px] rounded-[15px] bg-white m-1 my-3  flex items-center justify-center text-center hover:shadow-lg">
            <div className="flex flex-col items-center">
              <img height={50} width={50} src={mblAscr} alt="" />
              <p className="hover:text-red-500 cursor-pointer">
                Mobile Accessories
              </p>
            </div>
          </div>
          <div className="w-[150px] h-[130px] max-h-[160px] rounded-[15px] bg-white m-1 my-3  flex items-center justify-center text-center hover:shadow-lg">
            <div className="flex flex-col items-center">
              <img height={50} width={50} src={powerBank} alt="" />
              <p className="hover:text-red-500 cursor-pointer">
                Portable Power Station
              </p>
            </div>
          </div>

          <div className="w-[150px] h-[130px] max-h-[160px] rounded-[15px] bg-white m-1 my-3  flex items-center justify-center text-center hover:shadow-lg">
            <div className="flex flex-col items-center">
              <img height={50} width={50} src={vr} alt="" />
              <p className="hover:text-red-500 cursor-pointer">
                VR (Virtual Reality)
              </p>
            </div>
          </div>

          <div className="w-[150px] h-[130px] max-h-[160px] rounded-[15px] bg-white m-1 my-3  flex items-center justify-center text-center hover:shadow-lg">
            <div className="flex flex-col items-center">
              <img height={50} width={50} src={watch} alt="" />
              <p className="hover:text-red-500 cursor-pointer">Smart Watch</p>
            </div>
          </div>
          <div className="w-[150px] h-[130px] max-h-[160px] rounded-[15px] bg-white m-1 my-3  flex items-center justify-center text-center hover:shadow-lg">
            <div className="flex flex-col items-center">
              <img height={50} width={50} src={camera} alt="" />
              <p className="hover:text-red-500 cursor-pointer">Action Camera</p>
            </div>
          </div>
          <div className="w-[150px] h-[130px] max-h-[160px] rounded-[15px] bg-white m-1 my-3  flex items-center justify-center text-center hover:shadow-lg">
            <div className="flex flex-col items-center">
              <img height={50} width={50} src={earbuds} alt="" />
              <p className="hover:text-red-500 cursor-pointer">Earphones</p>
            </div>
          </div>
          <div className="w-[150px] h-[130px] max-h-[160px] rounded-[15px] bg-white m-1 my-3  flex items-center justify-center text-center hover:shadow-lg">
            <div className="flex flex-col items-center">
              <img height={50} width={50} src={airpode} alt="" />
              <p className="hover:text-red-500 cursor-pointer">Earbuds</p>
            </div>
          </div>
          <div className="w-[150px] h-[130px] max-h-[160px] rounded-[15px] bg-white m-1 my-3  flex items-center justify-center text-center hover:shadow-lg">
            <div className="flex flex-col items-center">
              <img height={50} width={50} src={speaker} alt="" />
              <p className="hover:text-red-500 cursor-pointer">
                Bluetooth Speakers
              </p>
            </div>
          </div>

          <div className="w-[150px] h-[130px] max-h-[160px] rounded-[15px] bg-white m-1 my-3  flex items-center justify-center text-center hover:shadow-lg">
            <div className="flex flex-col items-center">
              <img height={50} width={50} src={controller} alt="" />
              <p className="hover:text-red-500 cursor-pointer">
                Gaming Console
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCategory;
