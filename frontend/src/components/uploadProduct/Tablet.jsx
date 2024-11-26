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

const Tablet = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    key_features: "",
    description: "",
    display_size: "",
    display_type: "",

    display_resolution: "",
    processor: "",
    ram: "",
    storage: "",
    connectivity: "", 
    operating_system: "", 
    audio: "", 
    dimension: "", 
    weight: "", 
    sim: "", 
    color: "", 
    rear_camera: "", 
    front_camera: "", 
    battery_type: "", 
    battery_capacity: "", 
    bluetooth: "", 
    GPS: "", 
    sensor: "", 
    usb: "", 
    wlan: "", 
    price: "",
    sellingPrice: "",
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

    const response = await fetch(SummaryApi.uploadTablet.url, {
      method: SummaryApi.uploadTablet.method,
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
            <h2 className="font-bold text-lg">Upload Tablet</h2>
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
                  className="p-2 w-full bg-slate-50 border rounded"
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
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="key_features" className="mt-3">
                  Key Features :
                </label>
                <textarea
                  className="min-h-32 p-2 w-full bg-slate-50 border resize-none"
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
                  <div className="p-2 bg-slate-50 border rounded min-h-32 w-full flex justify-center items-center cursor-pointer">
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
                              className="bg-slate-50 border cursor-pointer"
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
                  className="p-2 w-full bg-slate-50 border rounded"
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
                <label htmlFor="display_size" className="mt-3">
                  Display Size:
                </label>
                <input
                  type="text"
                  id="display_size"
                  placeholder="Enter Display Size.."
                  value={data.display_size}
                  onChange={handleOnChange}
                  name="display_size"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
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
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="display_resolution" className="mt-3">
                  Display Resolution :
                </label>
                <input
                  type="text"
                  id="display_resolution"
                  placeholder="Enter Display Resolution.."
                  value={data.display_resolution}
                  onChange={handleOnChange}
                  name="display_resolution"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="processor" className="mt-3">
                Processor :
                </label>
                <input
                  type="text"
                  id="processor"
                  placeholder="Enter Processor.."
                  value={data.processor}
                  onChange={handleOnChange}
                  name="processor"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="ram" className="mt-3">
                  RAM :
                </label>
                <input
                  type="text"
                  id="ram"
                  placeholder="Enter RAM.."
                  value={data.ram}
                  onChange={handleOnChange}
                  name="ram"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="storage" className="mt-3">
                  Storage :
                </label>
                <input
                  type="text"
                  id="storage"
                  placeholder="Enter Storage.."
                  value={data.storage}
                  onChange={handleOnChange}
                  name="storage"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="connectivity" className="mt-3">
                Connectivity :
                </label>
                <input
                  type="number"
                  id="connectivity"
                  placeholder="Enter Connectivity.."
                  value={data.connectivity}
                  onChange={handleOnChange}
                  name="connectivity"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="operating_system" className="mt-3">
                  Operating System :
                </label>
                <input
                  type="text"
                  id="operating_system"
                  placeholder="Enter Operating System.."
                  value={data.operating_system}
                  onChange={handleOnChange}
                  name="operating_system"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="audio" className="mt-3">
                  Audio  :
                </label>
                <input
                  type="text"
                  id="audio"
                  placeholder="Enter Audio.."
                  value={data.audio}
                  onChange={handleOnChange}
                  name="audio"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="dimension" className="mt-3">
                  Dimension :
                </label>
                <input
                  type="text"
                  id="dimension"
                  placeholder="Enter Dimensions.."
                  value={data.dimension}
                  onChange={handleOnChange}
                  name="dimension"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="weight" className="mt-3">
                  Weight :
                </label>
                <input
                  type="text"
                  id="weight"
                  placeholder="Enter Weight.."
                  value={data.weight}
                  onChange={handleOnChange}
                  name="weight"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
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
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>

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
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="rear_camera" className="mt-3">
                  Rear Camera :
                </label>
                <input
                  type="number"
                  id="rear_camera"
                  placeholder="Enter Rear Camera.."
                  value={data.rear_camera}
                  onChange={handleOnChange}
                  name="rear_camera"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="front_camera" className="mt-3">
                  Front Camera :
                </label>
                <input
                  type="number"
                  id="front_camera"
                  placeholder="Enter Front Camera.."
                  value={data.front_camera}
                  onChange={handleOnChange}
                  name="front_camera"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="battery_type" className="mt-3">
                  Battery Type :
                </label>
                <input
                  type="text"
                  id="battery_type"
                  placeholder="Enter Battery Type.."
                  value={data.battery_type}
                  onChange={handleOnChange}
                  name="battery_type"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="battery_capacity" className="mt-3">
                  Battery Capacity :
                </label>
                <input
                  type="text"
                  id="battery_capacity"
                  placeholder="Enter Battery Capacity.."
                  value={data.battery_capacity}
                  onChange={handleOnChange}
                  name="battery_capacity"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
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
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="GPS" className="mt-3">
                  GPS :
                </label>
                <input
                  type="text"
                  id="GPS"
                  placeholder="Enter GPS.."
                  value={data.GPS}
                  onChange={handleOnChange}
                  name="GPS"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
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
                  className="p-2 w-full bg-slate-50 border rounded"
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
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>

            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="wlan" className="mt-3">
                   WLAN :
                </label>
                <input
                  type="number"
                  id="wlan"
                  placeholder="Enter WLAN.."
                  value={data.wlan}
                  onChange={handleOnChange}
                  name="wlan"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>

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
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="sellingPrice" className="mt-3">
                   Selling Price :
                </label>
                <input
                  type="number"
                  id="sellingPrice"
                  placeholder="Enter Selling Price.."
                  value={data.sellingPrice}
                  onChange={handleOnChange}
                  name="sellingPrice"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="warranty" className="mt-3">
                  Warranty :
                </label>
                <input
                  type="number"
                  id="warranty"
                  placeholder="Enter Warranty.."
                  value={data.warranty}
                  onChange={handleOnChange}
                  name="warranty"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <label htmlFor="description" className="mt-3">
              Description :
            </label>
            <textarea
              className="h-40 p-2 bg-slate-50 border resize-none"
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

export default Tablet;
