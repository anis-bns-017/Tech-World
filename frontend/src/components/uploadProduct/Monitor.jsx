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

const Monitor = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    key_features: "",
    description: "",
    display_size: "",
    display_type: "",
    panel_type: "",
    resolution: "",
    aspect_ratio: "",
    viewing_ratio: "",
    brightness: "",
    contrast_ratio: "",
    refresh_rate: "",
    color_support: "",
    response_time: "",
    curvature: "",
    vga: "",
    hdmi: "",
    vesa_wall_mount: "",
    color: "",
    dimension: "",
    weight: "",
    power_consumption: "",
    voltage: "",
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

    const response = await fetch(SummaryApi.uploadMonitor.url, {
      method: SummaryApi.uploadMonitor.method,
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
                  className="p-2 w-full bg-slate-100 border rounded"
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
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="panel_type" className="mt-3">
                  Panel Type :
                </label>
                <input
                  type="text"
                  id="panel_type"
                  placeholder="Enter Panel Type.."
                  value={data.panel_type}
                  onChange={handleOnChange}
                  name="panel_type"
                  className="p-2 w-full bg-slate-100 border rounded"
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
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="aspect_ratio" className="mt-3">
                  Aspect Ratio :
                </label>
                <input
                  type="text"
                  id="aspect_ratio"
                  placeholder="Enter Aspect Ratio.."
                  value={data.aspect_ratio}
                  onChange={handleOnChange}
                  name="aspect_ratio"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="viewing_ratio" className="mt-3">
                  Viewing Ratio :
                </label>
                <input
                  type="text"
                  id="viewing_ratio"
                  placeholder="Enter Viewing Ratio.."
                  value={data.viewing_ratio}
                  onChange={handleOnChange}
                  name="viewing_ratio"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="brightness" className="mt-3">
                  Brightness :
                </label>
                <input
                  type="number"
                  id="brightness"
                  placeholder="Enter Brightness.."
                  value={data.brightness}
                  onChange={handleOnChange}
                  name="brightness"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="contrast_ratio" className="mt-3">
                  Contrast Ratio :
                </label>
                <input
                  type="text"
                  id="contrast_ratio"
                  placeholder="Enter Contrast Ratio.."
                  value={data.contrast_ratio}
                  onChange={handleOnChange}
                  name="contrast_ratio"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="color_support" className="mt-3">
                  Color Support :
                </label>
                <input
                  type="text"
                  id="color_support"
                  placeholder="Enter Color Support.."
                  value={data.color_support}
                  onChange={handleOnChange}
                  name="color_support"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="response_time" className="mt-3">
                  Response Time :
                </label>
                <input
                  type="text"
                  id="response_time"
                  placeholder="Enter Response Time.."
                  value={data.response_time}
                  onChange={handleOnChange}
                  name="response_time"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="curvature" className="mt-3">
                  Curvature :
                </label>
                <input
                  type="text"
                  id="curvature"
                  placeholder="Enter Curvature.."
                  value={data.curvature}
                  onChange={handleOnChange}
                  name="curvature"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="vga" className="mt-3">
                  VGA:
                </label>
                <input
                  type="text"
                  id="vga"
                  placeholder="Enter VGA.."
                  value={data.vga}
                  onChange={handleOnChange}
                  name="vga"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="hdmi" className="mt-3">
                  HDMI :
                </label>
                <input
                  type="text"
                  id="hdmi"
                  placeholder="Enter HDMI.."
                  value={data.hdmi}
                  onChange={handleOnChange}
                  name="hdmi"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="vesa_wall_mount" className="mt-3">
                  Vesa Wall Amount :
                </label>
                <input
                  type="text"
                  id="vesa_wall_mount"
                  placeholder="Enter Vesa Wall Amount.."
                  value={data.vesa_wall_mount}
                  onChange={handleOnChange}
                  name="vesa_wall_mount"
                  className="p-2 w-full bg-slate-100 border rounded"
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
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="dimension" className="mt-3">
                  RAM :
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
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="power_consumption" className="mt-3">
                  Power Consumption :
                </label>
                <input
                  type="text"
                  id="power_consumption"
                  placeholder="Enter Power Consumption.."
                  value={data.power_consumption}
                  onChange={handleOnChange}
                  name="power_consumption"
                  className="p-2 w-full bg-slate-100 border rounded"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="voltage" className="mt-3">
                  Voltage :
                </label>
                <input
                  type="number"
                  id="voltage"
                  placeholder="Enter Voltage.."
                  value={data.voltage}
                  onChange={handleOnChange}
                  name="voltage"
                  className="p-2 w-full bg-slate-100 border rounded"
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
                  className="p-2 w-full bg-slate-100 border rounded"
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
                  className="p-2 w-full bg-slate-100 border rounded"
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

export default Monitor;
