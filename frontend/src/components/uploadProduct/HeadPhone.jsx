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

const HeadPhone = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    key_features: "",
    description: "",
    frequency_range: "",
    sensitivity: "",
    cable_lenght: "",
    impedance: "",
    others: "",
    driver_diameter: "",
    connectivity: "",
    battery_capacity: "",
    battery_life: "",
    input_jack: "",
    system_requirement: "",
    noise_ratio: "",
    pickup_pattern: "",
    weight: "",
    color: "",
    mic_frequency: "",
    mic_sensitivity: "",
    price: null,
    sellingPrice: null,
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

    const response = await fetch(SummaryApi.uploadHeadphone.url, {
      method: SummaryApi.uploadHeadphone.method,
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
            <h2 className="font-bold text-lg">Upload HeadPhone</h2>
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
                <label htmlFor="frequency_range" className="mt-3">
                  Frequency Range :
                </label>
                <input
                  type="text"
                  id="frequency_range"
                  placeholder="Enter Frequency Rate.."
                  value={data.frequency_range}
                  onChange={handleOnChange}
                  name="frequency_range"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="sensitivity" className="mt-3">
                  Sensitivity :
                </label>
                <input
                  type="text"
                  id="sensitivity"
                  placeholder="Enter Sensitivity.."
                  value={data.sensitivity}
                  onChange={handleOnChange}
                  name="sensitivity"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="cable_lenght" className="mt-3">
                  Cable Lenght :
                </label>
                <input
                  type="text"
                  id="cable_lenght"
                  placeholder="Enter Cable Lenght.."
                  value={data.cable_lenght}
                  onChange={handleOnChange}
                  name="cable_lenght"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="impedance" className="mt-3">
                  Impedance :
                </label>
                <input
                  type="text"
                  id="impedance"
                  placeholder="Enter Impedance.."
                  value={data.impedance}
                  onChange={handleOnChange}
                  name="impedance"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="driver_diameter" className="mt-3">
                  Driver Diameter :
                </label>
                <input
                  type="text"
                  id="driver_diameter"
                  placeholder="Enter  Driver Diameter.."
                  value={data.driver_diameter}
                  onChange={handleOnChange}
                  name="driver_diameter"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <label htmlFor="others" className="mt-3">
              Others :
            </label>
            <textarea
              className="h-40 p-2 bg-slate-50 border resize-none"
              placeholder="Enter Others"
              rows={3}
              cols={5}
              onChange={handleOnChange}
              name="others"
              value={data.others}
            ></textarea>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="connectivity" className="mt-3">
                  Connectivity :
                </label>
                <input
                  type="text"
                  id="connectivity"
                  placeholder="Enter Connectivity.."
                  value={data.connectivity}
                  onChange={handleOnChange}
                  name="connectivity"
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
                <label htmlFor="battery_life" className="mt-3">
                  Battery Life :
                </label>
                <input
                  type="text"
                  id="battery_life"
                  placeholder="Enter Battery Life.."
                  value={data.battery_life}
                  onChange={handleOnChange}
                  name="battery_life"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="input_jack" className="mt-3">
                  Input Jack :
                </label>
                <input
                  type="text"
                  id="input_jack"
                  placeholder="Enter Input Jack.."
                  value={data.input_jack}
                  onChange={handleOnChange}
                  name="coinput_jacklor"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="system_requirement" className="mt-3">
                  System Requirement :
                </label>
                <input
                  type="text"
                  id="system_requirement"
                  placeholder="Enter System Requirement.."
                  value={data.system_requirement}
                  onChange={handleOnChange}
                  name="system_requirement"
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
                <label htmlFor="noise_ratio" className="mt-3">
                  Noise Ratio :
                </label>
                <input
                  type="text"
                  id="noise_ratio"
                  placeholder="Enter Noise Ratio.."
                  value={data.noise_ratio}
                  onChange={handleOnChange}
                  name="noise_ratio"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="pickup_pattern" className="mt-3">
                  Pickup Pattern :
                </label>
                <input
                  type="text"
                  id="pickup_pattern"
                  placeholder="Enter Pickup Pattern.."
                  value={data.pickup_pattern}
                  onChange={handleOnChange}
                  name="pickup_pattern"
                  className="p-2 w-full bg-slate-50 border rounded"
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
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="mic_frequency" className="mt-3">
                  Mic Frequency :
                </label>
                <input
                  type="text"
                  id="mic_frequency"
                  placeholder="Enter Mic Frequency.."
                  value={data.mic_frequency}
                  onChange={handleOnChange}
                  name="mic_frequency"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="mic_sensitivity" className="mt-3">
                  Mic Sensitivity :
                </label>
                <input
                  type="text"
                  id="mic_sensitivity"
                  placeholder="Enter Mic Sensitivity.."
                  value={data.mic_sensitivity}
                  onChange={handleOnChange}
                  name="mic_sensitivity"
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

export default HeadPhone;
