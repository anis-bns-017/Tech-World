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

const Keyboard = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    key_features: "",
    description: "",
    wired_wiredless: "",
    keys: "",
    polling_rate: "",
    switch_color: "",
    lighting: "",
    others: "",
    system_requirements: "",
    cabel_length: "",
    interface: "",
    color: "",
    dimension: "",
    weight: "",
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

    const response = await fetch(SummaryApi.uploadKeyboard.url, {
      method: SummaryApi.uploadKeyboard.method,
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
            <h2 className="font-bold text-lg">Upload Keyboard</h2>
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
                <label htmlFor="wired_wiredless" className="mt-3">
                  Wired/Wiredless:
                </label>
                <input
                  type="text"
                  id="image_wired_wiredlesssensor"
                  placeholder="Enter Wired/Wireless.."
                  value={data.wired_wiredless}
                  onChange={handleOnChange}
                  name="wired_wiredless"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="keys" className="mt-3">
                  Keys :
                </label>
                <input
                  type="text"
                  id="keys"
                  placeholder="Enter Keys.."
                  value={data.keys}
                  onChange={handleOnChange}
                  name="keys"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="polling_rate" className="mt-3">
                  Polling Rate :
                </label>
                <input
                  type="text"
                  id="polling_rate"
                  placeholder="Enter Polling Rate.."
                  value={data.polling_rate}
                  onChange={handleOnChange}
                  name="polling_rate"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="switch_color" className="mt-3">
                  Switch Color :
                </label>
                <input
                  type="text"
                  id="switch_color"
                  placeholder="Enter Switch Color.."
                  value={data.switch_color}
                  onChange={handleOnChange}
                  name="switch_color"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="lighting" className="mt-3">
                  Lighting :
                </label>
                <input
                  type="text"
                  id="lighting"
                  placeholder="Enter Lighting.."
                  value={data.lighting}
                  onChange={handleOnChange}
                  name="lighting"
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
                <label htmlFor="system_requirements" className="mt-3">
                  System Requirements :
                </label>
                <input
                  type="text"
                  id="system_requirements"
                  placeholder="Enter System Requirement.."
                  value={data.system_requirements}
                  onChange={handleOnChange}
                  name="system_requirements"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="cabel_length" className="mt-3">
                  Cabel Lenght :
                </label>
                <input
                  type="text"
                  id="cabel_length"
                  placeholder="Enter Cable Lenght.."
                  value={data.cabel_length}
                  onChange={handleOnChange}
                  name="cabel_length"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="interface" className="mt-3">
                  Interface :
                </label>
                <input
                  type="text"
                  id="interface"
                  placeholder="Enter Interface.."
                  value={data.interface}
                  onChange={handleOnChange}
                  name="interface"
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

export default Keyboard;
