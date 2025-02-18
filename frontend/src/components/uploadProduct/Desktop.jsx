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

const Desktop = ({fetData}) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    key_features: "",
    processor: "",
    processor_warranty: "",
    motherboard: "",
    motherboard_warranty: "",
    ram: "",
    ram_warranty: "",
    storage: "",
    storage_warranty: "",
    casing: "",
    casing_warranty: "",
    price: 0,
    sellingPrice: 0,
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
    console.log(file);

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
  }

  // upload product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.uploadDesktop.url, {
      method: SummaryApi.uploadDesktop.method,
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
        <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
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
            <label htmlFor="productName">Product Name :</label>
            <input
              type="text"
              id="productName"
              placeholder="Enter product name.."
              value={data.productName}
              onChange={handleOnChange}
              name="productName"
              className="p-2 bg-slate-50 border rounded"
              required
            />

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
              className="p-2 bg-slate-50 border rounded"
              required
            />

            <label htmlFor="category" className="mt-3">
              Category :
            </label>
            <select
              value={data.category}
              className="p-2 bg-slate-50 border rounded"
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

            <label htmlFor="key_features" className="mt-3">
              Key Features :
            </label>
            <textarea
              className="h-28 bg-slate-50 border resize-none"
              placeholder="Enter Proddct Key Features"
              rows={3}
              cols={5}
              onChange={handleOnChange}
              name="key_features"
              value={data.key_features}
            ></textarea>

            <label htmlFor="processor_warranty" className="mt-3">
              Processor Warranty :
            </label>
            <input
              type="text"
              id="processor_warranty"
              placeholder="Processor Warranty"
              value={data.processor_warranty}
              onChange={handleOnChange}
              name="processor_warranty"
              className="p-2 bg-slate-50 border rounded"
              required
            />

            <label htmlFor="motherboard" className="mt-3">
              Motherboard :
            </label>
            <input
              type="text"
              id="motherboard"
              placeholder="Enter price.."
              value={data.motherboard}
              onChange={handleOnChange}
              name="motherboard"
              className="p-2 bg-slate-50 border rounded"
              required
            />

            <label htmlFor="motherboard_warranty" className="mt-3">
              Motherboard Warranty :
            </label>
            <input
              type="text"
              id="motherboard_warranty"
              placeholder="Motherboard Warranty"
              value={data.motherboard_warranty}
              onChange={handleOnChange}
              name="motherboard_warranty"
              className="p-2 bg-slate-50 border rounded"
              required
            />

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
              className="p-2 bg-slate-50 border rounded"
              required
            />

            <label htmlFor="ram_warranty" className="mt-3">
              RAM Warranty :
            </label>
            <input
              type="text"
              id="ram_warranty"
              placeholder="Enter RAM Warranty"
              value={data.ram_warranty}
              onChange={handleOnChange}
              name="ram_warranty"
              className="p-2 bg-slate-50 border rounded"
              required
            />

            <label htmlFor="storage" className="mt-3">
              Storage :
            </label>
            <input
              type="text"
              id="storage"
              placeholder="Enter Storage.."
              value={data.storoge}
              onChange={handleOnChange}
              name="storage"
              className="p-2 bg-slate-50 border rounded"
              required
            />

            <label htmlFor="storage_warranty" className="mt-3">
              Storage Warranty :
            </label>
            <input
              type="text"
              id="stroage_warranty"
              placeholder="Enter Storage Warranty.."
              value={data.storage_warranty}
              onChange={handleOnChange}
              name="storage_warranty"
              className="p-2 bg-slate-50 border rounded"
              required
            />

            <label htmlFor="casing" className="mt-3">
              Casing :
            </label>
            <input
              type="text"
              id="casing"
              placeholder="Enter casing.."
              value={data.casing}
              onChange={handleOnChange}
              name="casing"
              className="p-2 bg-slate-50 border rounded"
              required
            />

            <label htmlFor="casing_warranty" className="mt-3">
              Casing Warranty :
            </label>
            <input
              type="text"
              id="casing_warranty"
              placeholder="Enter Casing Warranty.."
              value={data.casing_warranty}
              onChange={handleOnChange}
              name="casing_warranty"
              className="p-2 bg-slate-50 border rounded"
              required
            />

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
              className="p-2 bg-slate-50 border rounded"
              required
            />

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
              className="p-2 bg-slate-50 border rounded"
              required
            />

            <label htmlFor="description" className="mt-3">
              Description :
            </label>
            <textarea
              className="h-28 bg-slate-50 border resize-none"
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

export default Desktop;
