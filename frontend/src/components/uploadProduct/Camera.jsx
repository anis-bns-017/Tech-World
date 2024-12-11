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

const Camera = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [""],
    key_features: "",
    description: "",
    image_sensor: "",
    sensor_resolution: "",
    image: "",
    video: "",
    display: "",
    usb_port: "",
    charging_interface: "",
    battery_type: "",
    battery_capacity: "",
    wifi: "",
    water_resistant: "",
    hdr_mode: "",
    slow_motion_recording: "",
    price: 0,
    sellingPrice: 0,
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

    const response = await fetch(SummaryApi.uploadCamera.url, {
      method: SummaryApi.uploadCamera.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      view();
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
            <h2 className="font-bold text-lg">Upload Camera</h2>
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
                  required
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
                  required
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
                        required
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
                  required
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
                <label htmlFor="image_sensor" className="mt-3">
                  Image Sensor:
                </label>
                <input
                  type="text"
                  id="image_sensor"
                  placeholder="Enter Image Sensor.."
                  value={data.image_sensor}
                  onChange={handleOnChange}
                  name="image_sensor"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="sensor_resolution" className="mt-3">
                  Sensor Resolution :
                </label>
                <input
                  type="text"
                  id="sensor_resolution"
                  placeholder="Enter Sensor Resolution.."
                  value={data.sensor_resolution}
                  onChange={handleOnChange}
                  name="sensor_resolution"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="image" className="mt-3">
                  Image :
                </label>
                <input
                  type="text"
                  id="image"
                  placeholder="Enter Image.."
                  value={data.image}
                  onChange={handleOnChange}
                  name="image"
                  className="p-2 w-full bg-slate-50 border rounded"
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
                  className="p-2 w-full bg-slate-50 border rounded"
                  required
                />
              </div>

              <div className="flex-1">
                <label htmlFor="display" className="mt-3">
                  Display :
                </label>
                <input
                  type="text"
                  id="display"
                  placeholder="Enter Display.."
                  value={data.display}
                  onChange={handleOnChange}
                  name="display"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <label htmlFor="video" className="mt-3">
              Video :
            </label>
            <textarea
              className="h-40 p-2 bg-slate-50 border resize-none"
              placeholder="Enter Video Description"
              rows={3}
              cols={5}
              onChange={handleOnChange}
              name="video"
              value={data.video}
            ></textarea>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="usb_port" className="mt-3">
                  USB Port :
                </label>
                <input
                  type="text"
                  id="usb_port"
                  placeholder="Enter USB Port.."
                  value={data.usb_port}
                  onChange={handleOnChange}
                  name="usb_port"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="charging_interface" className="mt-3">
                  Charging Interface :
                </label>
                <input
                  type="text"
                  id="charging_interface"
                  placeholder="Enter Charging Interface.."
                  value={data.charging_interface}
                  onChange={handleOnChange}
                  name="charging_interface"
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
                <label htmlFor="wifi" className="mt-3">
                  WIFI :
                </label>
                <input
                  type="text"
                  id="wifi"
                  placeholder="Enter WIFI.."
                  value={data.wifi}
                  onChange={handleOnChange}
                  name="wifi"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="water_resistant" className="mt-3">
                  Water Resistant :
                </label>
                <input
                  type="text"
                  id="water_resistant"
                  placeholder="Enter Water Resistant.."
                  value={data.water_resistant}
                  onChange={handleOnChange}
                  name="water_resistant"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="hdr_mode" className="mt-3">
                  HDR Mode :
                </label>
                <input
                  type="text"
                  id="hdr_mode"
                  placeholder="Enter HDR Mode.."
                  value={data.hdr_mode}
                  onChange={handleOnChange}
                  name="shdr_modeim"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="slow_motion_recording" className="mt-3">
                  Slow Motion Recording :
                </label>
                <input
                  type="text"
                  id="slow_motion_recording"
                  placeholder="Enter Slow Motion Recording.."
                  value={data.slow_motion_recording}
                  onChange={handleOnChange}
                  name="slow_motion_recording"
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
                  required
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

export default Camera;
