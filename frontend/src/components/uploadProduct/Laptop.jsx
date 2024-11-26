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

const Laptop = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    key_features: "",
    description: "",
    processor_brand: "",
    processor_model: "",
    processor_frequency: "",
    processor_core: "",
    processor_thread: "",
    cpu_cache: "",
    chipset: "",
    chipset_model: "",
    display: "",
    display_type: "",
    display_resolution: "",
    touch_screen: "",
    refresh_rate: "",
    display_features: "",
    ram: "",
    ram_type: "",
    bus_speed: "",
    total_ram_slot: "",
    max_ram_capacity: "",
    storage_type: "",
    storage_capacity: "",
    extra_m2_slot: "",
    storage_upgrade: "",
    graphics_model: "",
    graphics_memory: "",
    graphics_type: "",
    keyboard_type: "",
    touchPad: "",
    webcam: "",
    speaker: "",
    microphone: "",
    audio_features: "",
    optical_drive: "",
    card_reader: "",
    hdmi_port: "",
    usb_port: "",
    usb_type_c: "",
    microphone_port: "",
    lan: "",
    wifi: "",
    bluetooth: "",
    fingerPrint: "",
    camera_privacy_shutter: "",
    security_chip: "",
    operating_system: "",
    battery_capacity: "",
    adapter_type: "",
    dimensions: "",
    weight: "",
    body_material: "",
    warranty: "",
    price: "",
    sellingPrice: "",
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
  }
  // upload product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.uploadLaptop.url, {
      method: SummaryApi.uploadLaptop.method,
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
                <label htmlFor="usb_type_c" className="mt-3">
                  USB Type C :
                </label>
                <input
                  type="text"
                  id="usb_type_c"
                  placeholder="Enter USB Type C.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="usb_type_c"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="processor_brand" className="mt-3">
                  Processor Brand :
                </label>
                <input
                  type="text"
                  id="processor_brand"
                  placeholder="Enter Processor Name.."
                  value={data.processor_brand}
                  onChange={handleOnChange}
                  name="processor_brand"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>

              <div className="flex-1">
                <label htmlFor="processor_model" className="mt-3">
                  Processor Model :
                </label>
                <input
                  type="text"
                  id="processor_model"
                  placeholder="Enter Processor Model.."
                  value={data.processor_model}
                  onChange={handleOnChange}
                  name="processor_model"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="processor_frequency" className="mt-3">
                  Processor Frequency :
                </label>
                <input
                  type="text"
                  id="processor_frequency"
                  placeholder="Enter Processor Name.."
                  value={data.processor_frequency}
                  onChange={handleOnChange}
                  name="processor_frequency"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>

              <div className="flex-1">
                <label htmlFor="processor_core" className="mt-3">
                  Processor Core :
                </label>
                <input
                  type="number"
                  id="processor_core"
                  placeholder="Enter Processor Model.."
                  value={data.processor_core}
                  onChange={handleOnChange}
                  name="processor_core"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="processor_thread" className="mt-3">
                  Processor Thread :
                </label>
                <input
                  type="number"
                  id="processor_thread"
                  placeholder="Enter Processor Thread.."
                  value={data.processor_thread}
                  onChange={handleOnChange}
                  name="processor_thread"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>

              <div className="flex-1">
                <label htmlFor="cpu_cache" className="mt-3">
                  CPU Cache :
                </label>
                <input
                  type="number"
                  id="cpu_cache"
                  placeholder="Enter CPU Cache.."
                  value={data.cpu_cache}
                  onChange={handleOnChange}
                  name="cpu_cache"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
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
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>

              <div className="flex-1">
                <label htmlFor="chipset_model" className="mt-3">
                  Chipset Model :
                </label>
                <input
                  type="text"
                  id="chipset_model"
                  placeholder="Enter Chipset Model.."
                  value={data.chipset_model}
                  onChange={handleOnChange}
                  name="chipset_model"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>
            </div>

            <div className="flex gap-4">
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
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="display_resolution" className="mt-3">
                  Display Resolution:
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

              <div className="flex-1">
                <label htmlFor="touch_screen" className="mt-3">
                  Touch Screen :
                </label>
                <input
                  type="text"
                  id="touch_screen"
                  placeholder="Enter Touch Screen.."
                  value={data.touch_screen}
                  onChange={handleOnChange}
                  name="touch_screen"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>
            </div>

            <div className="flex gap-4">
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
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>

              <div className="flex-1">
                <label htmlFor="display_features" className="mt-3">
                  Display Features :
                </label>
                <input
                  type="text"
                  id="display_features"
                  placeholder="Enter Display Features.."
                  value={data.display_features}
                  onChange={handleOnChange}
                  name="display_features"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="ram" className="mt-3">
                  RAM :
                </label>
                <input
                  type="number"
                  id="ram"
                  placeholder="Enter RAM.."
                  value={data.ram}
                  onChange={handleOnChange}
                  name="ram"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>

              <div className="flex-1">
                <label htmlFor="ram_type" className="mt-3">
                  RAM Type :
                </label>
                <input
                  type="text"
                  id="ram_type"
                  placeholder="Enter RAM Type.."
                  value={data.ram_type}
                  onChange={handleOnChange}
                  name="ram_type"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="bus_speed" className="mt-3">
                  Bus Speed :
                </label>
                <input
                  type="number"
                  id="bus_speed"
                  placeholder="Enter Bus Speed.."
                  value={data.bus_speed}
                  onChange={handleOnChange}
                  name="bus_speed"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>

              <div className="flex-1">
                <label htmlFor="total_ram_slot" className="mt-3">
                  Total RAM Slot :
                </label>
                <input
                  type="number"
                  id="total_ram_slot"
                  placeholder="Enter Total RAM slot.."
                  value={data.total_ram_slot}
                  onChange={handleOnChange}
                  name="total_ram_slot"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="max_ram_capacity" className="mt-3">
                  Max RAM Capacity :
                </label>
                <input
                  type="number"
                  id="max_ram_capacity"
                  placeholder="Enter Max RAM Capacity.."
                  value={data.max_ram_capacity}
                  onChange={handleOnChange}
                  name="max_ram_capacity"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>

              <div className="flex-1">
                <label htmlFor="storage_type" className="mt-3">
                  Storage Type :
                </label>
                <input
                  type="text"
                  id="storage_type"
                  placeholder="Enter Storage Type.."
                  value={data.storage_type}
                  onChange={handleOnChange}
                  name="storage_type"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="storage_capacity" className="mt-3">
                  Storage Capacity :
                </label>
                <input
                  type="text"
                  id="storage_capacity"
                  placeholder="Enter Storage Capacity.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="storage_capacity"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>

              <div className="flex-1">
                <label htmlFor="extra_m2_slot" className="mt-3">
                  Extra M2 Slot :
                </label>
                <input
                  type="text"
                  id="extra_m2_slot"
                  placeholder="Enter Extra M2 Slot.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="extra_m2_slot"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="storage_upgrade" className="mt-3">
                  Storage Upgrade :
                </label>
                <input
                  type="text"
                  id="storage_upgrade"
                  placeholder="Enter Storage Upgrade.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="storage_upgrade"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>

              <div className="flex-1">
                <label htmlFor="graphics_model" className="mt-3">
                  Graphics Model :
                </label>
                <input
                  type="text"
                  id="graphics_model"
                  placeholder="Enter Graphics Model.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="graphics_model"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="graphics_memory" className="mt-3">
                  Graphics Memory :
                </label>
                <input
                  type="text"
                  id="graphics_memory"
                  placeholder="Enter Graphics Memory.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="graphics_memory"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>

              <div className="flex-1">
                <label htmlFor="graphics_type" className="mt-3">
                  Graphics Type :
                </label>
                <input
                  type="text"
                  id="graphics_type"
                  placeholder="Enter Graphics Type.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="graphics_type"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="keyboard_type" className="mt-3">
                  Keyboard Type :
                </label>
                <input
                  type="text"
                  id="keyboard_type"
                  placeholder="Enter Keyboard Type.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="keyboard_type"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>
              <div className="flex-1">
                <label htmlFor="touchPad" className="mt-3">
                  Touch Pad :
                </label>
                <input
                  type="text"
                  id="touchPad"
                  placeholder="Enter Touch Pad.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="touchPad"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="webcame" className="mt-3">
                  Webcam :
                </label>
                <input
                  type="text"
                  id="webcame"
                  placeholder="Enter Webcam.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="webcame"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>
              <div className="flex-1">
                <label htmlFor="speaker" className="mt-3">
                  Speaker :
                </label>
                <input
                  type="text"
                  id="speaker"
                  placeholder="Enter Speaker.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="speaker"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="microphone" className="mt-3">
                  MicroPhone :
                </label>
                <input
                  type="text"
                  id="microphone"
                  placeholder="Enter Microphone.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="microphone"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>

              <div className="flex-1">
                <label htmlFor="audio_features" className="mt-3">
                  Audio Features :
                </label>
                <input
                  type="text"
                  id="audio_features"
                  placeholder="Enter Audio Features.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="audio_features"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="optical_drive" className="mt-3">
                  Optical Drive :
                </label>
                <input
                  type="text"
                  id="optical_drive"
                  placeholder="Enter Optical Drive.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="optical_drive"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>
              <div className="flex-1">
                <label htmlFor="card_reader" className="mt-3">
                  Card Reader :
                </label>
                <input
                  type="text"
                  id="card_reader"
                  placeholder="Enter Card Reader.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="card_reader"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="hdmi_port" className="mt-3">
                  HDMI Port :
                </label>
                <input
                  type="text"
                  id="hdmi_port"
                  placeholder="Enter HDMI Port.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="hdmi_port"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>
              <div className="flex-1">
                <label htmlFor="usb_port" className="mt-3">
                  USB Port :
                </label>
                <input
                  type="text"
                  id="usb_port"
                  placeholder="Enter USB Port.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="usb_port"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="microphone_port" className="mt-3">
                  Microphone Port :
                </label>
                <input
                  type="text"
                  id="microphone_port"
                  placeholder="Enter Microphone Port.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="microphone_port"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>

              <div className="flex-1">
                <label htmlFor="lan" className="mt-3">
                  LAN :
                </label>
                <input
                  type="text"
                  id="lan"
                  placeholder="Enter LAN.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="lan"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="wifi" className="mt-3">
                  Wifi :
                </label>
                <input
                  type="text"
                  id="wifi"
                  placeholder="Enter Wifi.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="wifi"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
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
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="bluetooth"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="fingerPrint" className="mt-3">
                  Finger Print :
                </label>
                <input
                  type="text"
                  id="fingerPrint"
                  placeholder="Enter Finger Print.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="fingerPrint"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>

              <div className="flex-1">
                <label htmlFor="camera_privacy_shutter" className="mt-3">
                  Camera Privacy Shutter :
                </label>
                <input
                  type="text"
                  id="camera_privacy_shutter"
                  placeholder="Enter Camer privacy Shutter.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="camera_privacy_shutter"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="security_chip" className="mt-3">
                  Security Chip :
                </label>
                <input
                  type="text"
                  id="security_chip"
                  placeholder="Enter Security Chip.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="security_chip"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>

              <div className="flex-1">
                <label htmlFor="operating_system" className="mt-3">
                  Operating System :
                </label>
                <input
                  type="text"
                  id="operating_system"
                  placeholder="Enter Operating System.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="operating_system"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="battery_capacity" className="mt-3">
                  Battery Capacity :
                </label>
                <input
                  type="text"
                  id="battery_capacity"
                  placeholder="Enter Battery Capacity.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="battery_capacity"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>

              <div className="flex-1">
                <label htmlFor="adapter_type" className="mt-3">
                  Adapter Type :
                </label>
                <input
                  type="text"
                  id="adapter_type"
                  placeholder="Enter Adapter Type.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="adapter_type"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="dimensions" className="mt-3">
                  Dimensions :
                </label>
                <input
                  type="text"
                  id="dimensions"
                  placeholder="Enter Dimensions.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="dimensions"
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
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="weight"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="body_material" className="mt-3">
                  Body Material :
                </label>
                <input
                  type="text"
                  id="body_material"
                  placeholder="Enter Body Material.."
                  value={data.motherboard}
                  onChange={handleOnChange}
                  name="body_material"
                  className="p-2 w-full bg-slate-50 border rounded"
                  
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

export default Laptop;
