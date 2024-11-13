import { useState } from "react";
import uploadImage from "../../helpers/UploadImage";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import productCategory from "../../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DisplayImage from "../DIsplayImage";
import { useNavigate } from "react-router-dom";

const Phone = ({onClose, fetchData}) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    key_features: "",
    description: "",
    display_size: "",
    display_type: "",
    screen_resolution: "",
    refresh_rate: "",
    protection: "",
    display_features: "",
    chipset: "",
    cpu_type: "",
    cpu_speed: "",
    gpu: "",
    ram: "",
    internal_storage: "",
    card_slot: "",
    rear_camera_resolution: "",
    rear_camera_features: "",
    rear_video_recording: "",
    front_camera_resolution: "",
    front_video_recording: "",
    speaker: "",
    sim: "",
    network: "",
    wifi: "",
    bluetooth: "",
    gps: "",
    usb: "",
    audio_jack: "",
    opearating_system: "",
    finger_print: "",
    sensor: "",
    battery: "",
    dimension: "",
    color: "",
    price: Number,
    sellingPrice: Number,
    warranty: "",
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [openUploadProduct, setOpenUploadProduct] = useState(true);
  const [fullScreenImage, setFullscreenImage] = useState("");
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];

    const uploadImageCloudinary = await uploadImage(file);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      };
    });
  };

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };

  const view = () => {
    setOpenUploadProduct(false);
    navigate("/");
  };
  // upload product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.uploadPhone.url, {
      method: SummaryApi.uploadPhone.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    openUploadProduct && (
      <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        <div className="bg-white p-4 rounded w-full max-w-7xl h-full max-h-[80%] overflow-hidden">
          <div className="flex justify-center items-center">
            <h2 className="font-bold text-lg">Upload Product</h2>
            <div
              className="w-fit hover:cursor-pointer ml-auto text-2xl"
              onClick={view}
            >
              <IoMdClose />
            </div>
          </div>

          <form
            className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="productName">Product Name :</label>
                <input
                  type="text"
                  id="productName"
                  placeholder="Enter product name.."
                  value={data.productName}
                  onChange={handleOnChange}
                  name="productName"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="brandName" className="mt-3">
                  Brand Name :
                </label>
                <input
                  type="text"
                  id="brandName"
                  placeholder="Enter brand name.."
                  value={data.brandName}
                  onChange={handleOnChange}
                  name="brandName"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="key_features" className="mt-3">
                  Key Features :
                </label>
                <textarea
                  className="min-h-32 p-2 w-full bg-slate-100 border resize-none"
                  placeholder="Enter Proddct Key Features"
                  rows={3}
                  cols={5}
                  onChange={handleOnChange}
                  name="key_features"
                  value={data.key_features}
                ></textarea>
              </div>

              <div className="flex-1">
                <label htmlFor="productImage" className="mt-3">
                  Product Image :
                </label>

                <label htmlFor="uploadImageInput">
                  <div className="p-2 bg-slate-100 border rounded min-h-32 w-full flex justify-center items-center cursor-pointer">
                    <div className="text-slate-600 flex justify-center items-center flex-col gap-2">
                      <span className="text-4xl">
                        <FaCloudUploadAlt />
                      </span>
                      <p className="text-sm">Upload product image..</p>
                      <input
                        type="file"
                        id="uploadImageInput"
                        className="hidden"
                        onChange={handleUploadProduct}
                      />
                    </div>
                  </div>
                </label>

                <div>
                  {data?.productImage[0] ? (
                    <div className="flex items-center gap-2">
                      {data.productImage.map((el, index) => {
                        return (
                          <div key={el} className="relative group">
                            <img
                              src={el}
                              key={el}
                              alt={el}
                              width={80}
                              height={80}
                              className="bg-slate-100 border cursor-pointer"
                              onClick={() => {
                                setOpenFullScreenImage(true);
                                setFullscreenImage(el);
                              }}
                            />

                            <div
                              onClick={() => handleDeleteProductImage(index)}
                              className="hidden absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full group-hover:block cursor-pointer"
                            >
                              <MdDelete />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-red-500 text-xs">
                      *Please Upload Product image
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="category" className="mt-3">
                  Category :
                </label>
                <select
                  value={data.category}
                  className="p-2 w-full bg-slate-100 border rounded"
                  onChange={handleOnChange}
                  name="category"
                >
                  <option value="">Select Category</option>
                  {productCategory.map((el, index) => {
                    return (
                      <option value={el.value} key={el.value + index}>
                        {el.label}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="flex-1">
                <label htmlFor="key_features" className="mt-3">
                  Key Features :
                </label>
                <input
                  type="text"
                  id="key_features"
                  placeholder="Enter Key Features.."
                  value={data.key_features}
                  onChange={handleOnChange}
                  name="key_features"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="display_size" className="mt-3">
                  Display Size :
                </label>
                <input
                  type="text"
                  id="display_size"
                  placeholder="Enter Display Size.."
                  value={data.display_size}
                  onChange={handleOnChange}
                  name="display_size"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="display_type" className="mt-3">
                  Display Type :
                </label>
                <input
                  type="text"
                  id="display_type"
                  placeholder="Enter Display Type.."
                  value={data.display_type}
                  onChange={handleOnChange}
                  name="display_type"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="screen_resolution" className="mt-3">
                  Screen Resolution :
                </label>
                <input
                  type="text"
                  id="screen_resolution"
                  placeholder="Enter Screen Resolution.."
                  value={data.screen_resolution}
                  onChange={handleOnChange}
                  name="screen_resolution"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="refresh_rate" className="mt-3">
                  Refresh Rate :
                </label>
                <input
                  type="text"
                  id="refresh_rate"
                  placeholder="Enter Refresh Rate.."
                  value={data.refresh_rate}
                  onChange={handleOnChange}
                  name="refresh_rate"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="protection" className="mt-3">
                  Protected :
                </label>
                <input
                  type="number"
                  id="protection"
                  placeholder="Enter Protection.."
                  value={data.protection}
                  onChange={handleOnChange}
                  name="protection"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="display_features" className="mt-3">
                  Display Features :
                </label>
                <input
                  type="number"
                  id="display_features"
                  placeholder="Enter Display Features.."
                  value={data.display_features}
                  onChange={handleOnChange}
                  name="display_features"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="chipset" className="mt-3">
                  Chipset :
                </label>
                <input
                  type="text"
                  id="chipset"
                  placeholder="Enter Chipset.."
                  value={data.chipset}
                  onChange={handleOnChange}
                  name="chipset"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="cpu_type" className="mt-3">
                  Chipset Type :
                </label>
                <input
                  type="text"
                  id="cpu_type"
                  placeholder="Enter Chipset Type.."
                  value={data.cpu_type}
                  onChange={handleOnChange}
                  name="cpu_type"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="cpu_speed" className="mt-3">
                  CPU Speed :
                </label>
                <input
                  type="text"
                  id="cpu_speed"
                  placeholder="Enter CPU Speed.."
                  value={data.cpu_speed}
                  onChange={handleOnChange}
                  name="cpu_speed"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="gpu" className="mt-3">
                  Display Type :
                </label>
                <input
                  type="text"
                  id="gpu"
                  placeholder="Enter Display Type.."
                  value={data.gpu}
                  onChange={handleOnChange}
                  name="gpu"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="ram" className="mt-3">
                  RAM:
                </label>
                <input
                  type="text"
                  id="ram"
                  placeholder="Enter RAM.."
                  value={data.ram}
                  onChange={handleOnChange}
                  name="ram"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="internal_storage" className="mt-3">
                  Touch Screen :
                </label>
                <input
                  type="text"
                  id="internal_storage"
                  placeholder="Enter Internal Storage.."
                  value={data.internal_storage}
                  onChange={handleOnChange}
                  name="internal_storage"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="card_slot" className="mt-3">
                  Card Slot :
                </label>
                <input
                  type="text"
                  id="card_slot"
                  placeholder="Enter Refresh Rate.."
                  value={data.card_slot}
                  onChange={handleOnChange}
                  name="card_slot"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="rear_camera_resolution" className="mt-3">
                  Rear Camera Resolution :
                </label>
                <input
                  type="text"
                  id="rear_camera_resolution"
                  placeholder="Enter Rear Camera Resolution.."
                  value={data.rear_camera_resolution}
                  onChange={handleOnChange}
                  name="rear_camera_resolution"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="rear_camera_features" className="mt-3">
                  Rear Camera Features :
                </label>
                <input
                  type="text"
                  id="rear_camera_features"
                  placeholder="Enter Rear Camera Features.."
                  value={data.rear_camera_features}
                  onChange={handleOnChange}
                  name="rear_camera_features"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="rear_video_recording" className="mt-3">
                  Rear Video Recording :
                </label>
                <input
                  type="text"
                  id="rear_video_recording"
                  placeholder="Enter Rear Video Recording.."
                  value={data.rear_video_recording}
                  onChange={handleOnChange}
                  name="rear_video_recording"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="front_camera_resolution" className="mt-3">
                  Front Camera Resolution :
                </label>
                <input
                  type="text"
                  id="front_camera_resolution"
                  placeholder="Enter Bus Speed.."
                  value={data.front_camera_resolution}
                  onChange={handleOnChange}
                  name="front_camera_resolution"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="front_video_recording" className="mt-3">
                  Front Video Recording :
                </label>
                <input
                  type="text"
                  id="front_video_recording"
                  placeholder="Enter Front Video Recording.."
                  value={data.front_video_recording}
                  onChange={handleOnChange}
                  name="front_video_recording"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="speaker" className="mt-3">
                  Speaker :
                </label>
                <input
                  type="text"
                  id="speaker"
                  placeholder="Enter Speaker.."
                  value={data.speaker}
                  onChange={handleOnChange}
                  name="speaker"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="sim" className="mt-3">
                  SIM :
                </label>
                <input
                  type="text"
                  id="sim"
                  placeholder="Enter SIM.."
                  value={data.sim}
                  onChange={handleOnChange}
                  name="sim"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="network" className="mt-3">
                  Network :
                </label>
                <input
                  type="text"
                  id="network"
                  placeholder="Enter Network.."
                  value={data.network}
                  onChange={handleOnChange}
                  name="network"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="bluetooth" className="mt-3">
                  Bluetooth :
                </label>
                <input
                  type="text"
                  id="bluetooth"
                  placeholder="Enter Bluetooth.."
                  value={data.bluetooth}
                  onChange={handleOnChange}
                  name="bluetooth"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="gps" className="mt-3">
                  GPS :
                </label>
                <input
                  type="text"
                  id="gps"
                  placeholder="Enter GPS.."
                  value={data.gps}
                  onChange={handleOnChange}
                  name="gps"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="usb" className="mt-3">
                  USB :
                </label>
                <input
                  type="text"
                  id="usb"
                  placeholder="Enter USB.."
                  value={data.usb}
                  onChange={handleOnChange}
                  name="usb"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="audio_jack" className="mt-3">
                  Audio Jack :
                </label>
                <input
                  type="text"
                  id="audio_jack"
                  placeholder="Enter Graphics Memory.."
                  value={data.audio_jack}
                  onChange={handleOnChange}
                  name="audio_jack"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="opearating_system" className="mt-3">
                  Operating System :
                </label>
                <input
                  type="text"
                  id="opearating_system"
                  placeholder="Enter Operating System.."
                  value={data.opearating_system}
                  onChange={handleOnChange}
                  name="opearating_system"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="finger_print" className="mt-3">
                  Finger Print :
                </label>
                <input
                  type="text"
                  id="finger_print"
                  placeholder="Enter Finger Print.."
                  value={data.finger_print}
                  onChange={handleOnChange}
                  name="finger_print"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="sensor" className="mt-3">
                  Sensor :
                </label>
                <input
                  type="text"
                  id="sensor"
                  placeholder="Enter Sensor.."
                  value={data.sensor}
                  onChange={handleOnChange}
                  name="sensor"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="battery" className="mt-3">
                  Battery :
                </label>
                <input
                  type="text"
                  id="battery"
                  placeholder="Enter Battery.."
                  value={data.battery}
                  onChange={handleOnChange}
                  name="battery"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="dimension" className="mt-3">
                  Dimension :
                </label>
                <input
                  type="text"
                  id="dimension"
                  placeholder="Enter Dimension.."
                  value={data.dimension}
                  onChange={handleOnChange}
                  name="dimension"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="color" className="mt-3">
                  Color :
                </label>
                <input
                  type="text"
                  id="color"
                  placeholder="Enter Color.."
                  value={data.color}
                  onChange={handleOnChange}
                  name="color"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="warranty" className="mt-3">
                  Warranty :
                </label>
                <input
                  type="text"
                  id="warranty"
                  placeholder="Enter Warranty.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="warranty"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="price" className="mt-3">
                  Price :
                </label>
                <input
                  type="number"
                  id="price"
                  placeholder="Enter Price.."
                  value={data.price}
                  onChange={handleOnChange}
                  name="price"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="sellingPrice" className="mt-3">
                  Selling Price :
                </label>
                <input
                  type="number"
                  id="sellingPrice"
                  placeholder="Enter selling price.."
                  value={data.sellingPrice}
                  onChange={handleOnChange}
                  name="sellingPrice"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
            </div>

            <label htmlFor="description" className="mt-3">
              Description :
            </label>
            <textarea
              className="h-40 p-2 bg-slate-100 border resize-none"
              placeholder="Enter Proddct Description"
              rows={3}
              cols={5}
              onChange={handleOnChange}
              name="description"
              value={data.description}
            ></textarea>

            <button className="px-23 py-2  bg-blue-600 text-white rounded mb-10 hover:bg-red-800">
              Upload Product
            </button>
          </form>
        </div>

        {/* Display Image full screen */}
        {openFullScreenImage && (
          <DisplayImage
            onClose={() => setOpenFullScreenImage(false)}
            imgUIrl={fullScreenImage}
          />
        )}
      </div>
    )
  );
};

export default Phone;
