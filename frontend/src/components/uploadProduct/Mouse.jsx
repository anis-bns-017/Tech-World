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

const Mouse = ({ fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    key_features: "",
    description: "",
    number_of_keys: "",
    connection_type: "",
    optical_sensor: "",
    resolution: "",
    button: "",
    polling_rate: "",
    switch_lifecycle: "",
    tracking_method: "",
    acceleration: "",
    color: "",
    weight: "",
    dimension: "",
    battery_life: "",
    cable_lenth: "",
    mechanical_switches: "",
    built_in_memory: "",
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

    const response = await fetch(SummaryApi.uploadMouse.url, {
      method: SummaryApi.uploadMouse.method,
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
            <h2 className="font-bold text-lg">Upload Mouse</h2>
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
                <label htmlFor="number_of_keys" className="mt-3">
                  Number of Keys :
                </label>
                <input
                  type="number"
                  id="number_of_keys"
                  placeholder="Enter Number of Keys.."
                  value={data.number_of_keys}
                  onChange={handleOnChange}
                  name="number_of_keys"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="connection_type" className="mt-3">
                  Connection Type :
                </label>
                <input
                  type="text"
                  id="connection_type"
                  placeholder="Enter Connection Type.."
                  value={data.connection_type}
                  onChange={handleOnChange}
                  name="connection_type"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="optical_sensor" className="mt-3">
                  Optical Sensor :
                </label>
                <input
                  type="text"
                  id="optical_sensor"
                  placeholder="Enter Optical Sensor.."
                  value={data.optical_sensor}
                  onChange={handleOnChange}
                  name="optical_sensor"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="resolution" className="mt-3">
                  Resolution :
                </label>
                <input
                  type="text"
                  id="resolution"
                  placeholder="Enter Resolution.."
                  value={data.resolution}
                  onChange={handleOnChange}
                  name="resolution"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="button" className="mt-3">
                  Button :
                </label>
                <input
                  type="text"
                  id="button"
                  placeholder="Enter Button.."
                  value={data.button}
                  onChange={handleOnChange}
                  name="button"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <label htmlFor="battery_life" className="mt-3">
              Battery Life :
            </label>
            <textarea
              className="h-40 p-2 bg-slate-50 border resize-none"
              placeholder="Enter Battery Life"
              rows={3}
              cols={5}
              onChange={handleOnChange}
              name="battery_life"
              value={data.battery_life}
            ></textarea>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="switch_lifecycle" className="mt-3">
                  Switch LifeCycle :
                </label>
                <input
                  type="text"
                  id="switch_lifecycle"
                  placeholder="Enter Switch LifeCycle.."
                  value={data.switch_lifecycle}
                  onChange={handleOnChange}
                  name="switch_lifecycle"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="tracking_method" className="mt-3">
                  Tracking Method :
                </label>
                <input
                  type="text"
                  id="tracking_method"
                  placeholder="Enter Tracking Method.."
                  value={data.tracking_method}
                  onChange={handleOnChange}
                  name="tracking_method"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="acceleration" className="mt-3">
                  Acceleration :
                </label>
                <input
                  type="text"
                  id="acceleration"
                  placeholder="Enter Acceleration.."
                  value={data.acceleration}
                  onChange={handleOnChange}
                  name="acceleration"
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
                <label htmlFor="cable_lenth" className="mt-3">
                  Cable Lenght :
                </label>
                <input
                  type="number"
                  id="cable_lenth"
                  placeholder="Enter Cable Lenght.."
                  value={data.cable_lenth}
                  onChange={handleOnChange}
                  name="cable_lenth"
                  className="p-2 w-full bg-slate-50 border rounded"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="mechanical_switches" className="mt-3">
                  Mechanical Switches :
                </label>
                <input
                  type="number"
                  id="mechanical_switches"
                  placeholder="Enter Mechanical Switches.."
                  value={data.mechanical_switches}
                  onChange={handleOnChange}
                  name="mechanical_switches"
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

            <div className="flex gap-4">
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

              <div className="flex-1">
                <label htmlFor="built_in_memory" className="mt-3">
                  Build in Memory :
                </label>
                <input
                  type="number"
                  id="built_in_memory"
                  placeholder="Enter Selling Price.."
                  value={data.built_in_memory}
                  onChange={handleOnChange}
                  name="built_in_memory"
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

export default Mouse;
