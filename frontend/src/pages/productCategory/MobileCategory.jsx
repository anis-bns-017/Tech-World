import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import ShowPhone from "../../components/categoryProduct/ShowPhone";
import { useState } from "react";
import PriceRangeSlider from "../../components/PriceRangeSlider";

const MobileCategory = () => {
  const user = useSelector((state) => state?.user?.user);
  const brands = [
    "Apple",
    "Samsung",
    "Motorola",
    "OnePlus",
    "Oppo",
    "Vivo",
    "Realme",
    "Xiaomi",
    "Nokia",
    "Honor",
    "TCL",
    "Infinix",
    "Asus",
    "ZTE",
    "Benco",
    "Tecno",
    "Walton",
  ];

  const displaySize = [
    '5.5" to 5.9"',
    '6.0" to 6.5"',
    '6.6" to 7.0"',
    '7.1" to 7.5"',
  ];

  const displayType = ["TFT", "IPS", "AMOLED", "Super AMOLED", "OLED"];
  const chipsets = [
    "Snapdragon",
    "MediaTek",
    "Exynos",
    "UNISOC",
    "Bionic",
    "Tensor",
    "Kirin",
  ];

  const features = [
    "Dual SIM",
    "eSIM Support",
    "Virtual Memory",
    "Fast Charging",
    "Water Registance",
    "Fordable",
  ];

  const rams = [2, 3, 4, 6, 8, 12, 16];
  const internalStorage = ["32GB", "64GB", "128GB", "256GB", "512GB", "1TB"];

  const [rangeValues, setRangeValues] = useState({ min: 0, max: 334999 });

  const handleRangeChange = (values) => {
    setRangeValues(values);
  };

  const [visibleBrand, SetVisibleBrand] = useState(true);
  const [visibleDisplay, setVisibleDisplay] = useState(true);
  const [visibleDisplayType, setVisibleDisplayType] = useState(true);
  const [visibleChipset, setVisibleChipset] = useState(true);
  const [visibleRam, setVisibleRam] = useState(true);
  const [visibleStorage, setVisibleStorage] = useState(true);
  const [visibleFeatures, setVisibleFeatures] = useState(true);

  return (
    <>
      <div className="pl-8 flex bg-slate-200 py-5">
        <div className="w-[35vh] bg-100 rounded-lg bg-slate-200">
          <aside>
            <form className="space-y-4 bg-slate-200">
              {/* Category Section */}

              <div className="bg-slate-50 p-5 rounded-md shadow-md items-center justify-center flex-col">
                {/* <h1 className="text-3xl text-neutral-300 font-medium">Custom Price Range Slider</h1> */}
                <div className="mb-3">
                  <h3 className="text-lg font-medium mb-2">Price Range</h3>
                  <hr></hr>
                </div>

                <PriceRangeSlider
                  min={0}
                  max={334999}
                  onChange={handleRangeChange}
                />
              </div>

              <div className="bg-slate-50 p-5 rounded-md shadow-md">
                <div>
                  <h3 className="text-lg font-medium mb-2">Availability</h3>
                  <hr></hr>
                </div>
                <div className="space-y-2 mt-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="category"
                      value="electronics"
                      className="rounded text-blue-600 focus:ring focus:ring-blue-300"
                    />
                    <span className="text-[15px]">In Stock</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="category"
                      value="fashion"
                      className="rounded text-blue-600 focus:ring focus:ring-blue-300"
                    />
                    <span className="text-[15px]">Pre Order</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="category"
                      value="home"
                      className="rounded text-blue-600 focus:ring focus:ring-blue-300"
                    />
                    <span className="text-[15px]">Upcoming</span>
                  </label>
                </div>
              </div>

              {/* Price Range Section */}
              <div className="bg-slate-50 px-3 rounded-md shadow-md">
                {/* Header Section */}
                <div className="sticky top-0 bg-slate-50 z-10 w-full p-3 flex justify-between">
                  <h3 className="text-lg font-medium mb-2">Brand</h3>
                  {/* Toggle Button */}
                  <h2
                    className="cursor-pointer transform transition-transform duration-300"
                    onClick={() => SetVisibleBrand(!visibleBrand)} // Toggle visibility
                  >
                    {visibleBrand ? "˅" : ">"}
                  </h2>
                </div>
                <hr />
                {/* Content Section with Animation */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    visibleBrand
                      ? "max-h-[50vh] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="overflow-y-scroll h-[50vh] space-y-2 mt-3 p-3">
                    {brands.map((brand) => (
                      <label
                        key={brand}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          name={brand.toLowerCase()}
                          value={brand.toLowerCase()}
                          className="rounded text-blue-600 focus:ring focus:ring-blue-300"
                        />
                        <span className="text-[15px]">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 px-3 rounded-md shadow-md">
                {/* Header Section */}
                <div className="sticky top-0 bg-slate-50 z-10 w-full p-3 flex justify-between">
                  <h3 className="text-lg font-medium mb-2">Display Size</h3>
                  {/* Toggle Button */}
                  <h2
                    className="cursor-pointer transform transition-transform duration-300"
                    onClick={() => setVisibleDisplay(!visibleDisplay)} // Toggle visibility
                  >
                    {visibleDisplay ? "˅" : ">"}
                  </h2>
                </div>
                <hr />
                {/* Content Section with Animation */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    visibleDisplay
                      ? "max-h-screen opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="space-y-2 p-3">
                    {displaySize.map((display) => (
                      <label
                        key={display}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          name={display}
                          value={display}
                          className="rounded text-blue-600 focus:ring focus:ring-blue-300"
                        />
                        <span className="text-[15px]">{display}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 px-3 rounded-md shadow-md">
                {/* Header Section */}
                <div className="sticky top-0 bg-slate-50 z-10 w-full p-3 flex justify-between">
                  <h3 className="text-lg font-medium mb-2">Display Type</h3>
                  {/* Toggle Button */}
                  <h2
                    className="cursor-pointer transform transition-transform duration-300"
                    onClick={() => setVisibleDisplayType(!visibleDisplayType)} // Toggle visibility
                  >
                    {visibleDisplayType ? "˅" : ">"}
                  </h2>
                </div>
                <hr />
                {/* Content Section with Animation */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    visibleDisplayType
                      ? "max-h-screen opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="space-y-2 p-3">
                    {displayType.map((display) => (
                      <label
                        key={display}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          name={display}
                          value={display}
                          className="rounded text-blue-600 focus:ring focus:ring-blue-300"
                        />
                        <span className="text-[15px]">{display}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 px-3 rounded-md shadow-md">
                {/* Header Section */}
                <div className="sticky top-0 bg-slate-50 z-10 w-full p-3 flex justify-between">
                  <h3 className="text-lg font-medium mb-2">Chipset</h3>
                  {/* Toggle Button */}
                  <h2
                    className="cursor-pointer transform transition-transform duration-300"
                    onClick={() => setVisibleChipset(!visibleChipset)} // Toggle visibility
                  >
                    {visibleChipset ? "˅" : ">"}
                  </h2>
                </div>
                <hr />
                {/* Content Section with Animation */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    visibleChipset
                      ? "max-h-screen opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="space-y-2 p-3">
                    {chipsets.map((chipset) => (
                      <label
                        key={chipset}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          name={chipset}
                          value={chipset}
                          className="rounded text-blue-600 focus:ring focus:ring-blue-300"
                        />
                        <span className="text-[15px]">{chipset}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 px-3 rounded-md shadow-md">
                <div className="sticky top-0 bg-slate-50 z-10 w-full p-3 flex justify-between">
                  <h3 className="text-lg font-medium mb-2">RAM</h3>

                  <h2
                    className="cursor-pointer transform transition-transform duration-300"
                    onClick={() => setVisibleRam(!visibleRam)}
                  >
                    {visibleRam ? "˅" : ">"}
                  </h2>
                </div>
                <hr />
                {/* Content Section with Animation */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    visibleRam
                      ? "max-h-screen opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="space-y-2 p-3">
                    {rams.map((ram) => (
                      <label key={ram} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name={ram}
                          value={ram}
                          className="rounded text-blue-600 focus:ring focus:ring-blue-300"
                        />
                        <span className="text-[15px]">{ram + "GB"}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 px-3 rounded-md shadow-md">
                {/* Header Section */}
                <div className="sticky top-0 bg-slate-50 z-10 w-full p-3 flex justify-between">
                  <h3 className="text-lg font-medium mb-2">Internal Storage</h3>
                  {/* Toggle Button */}
                  <h2
                    className="cursor-pointer transform transition-transform duration-300"
                    onClick={() => setVisibleStorage(!visibleStorage)} // Toggle visibility
                  >
                    {visibleStorage ? "˅" : ">"}
                  </h2>
                </div>
                <hr />
                {/* Content Section with Animation */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    visibleStorage
                      ? "max-h-screen opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="space-y-2 p-3">
                    {internalStorage.map((storage) => (
                      <label
                        key={storage}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          name={storage}
                          value={storage}
                          className="rounded text-blue-600 focus:ring focus:ring-blue-300"
                        />
                        <span className="text-[15px]">{storage}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 px-3 rounded-md shadow-md">
                {/* Header Section */}
                <div className="sticky top-0 bg-slate-50 z-10 w-full p-3 flex justify-between">
                  <h3 className="text-lg font-medium mb-2">Features</h3>
                  {/* Toggle Button */}
                  <h2
                    className="cursor-pointer transform transition-transform duration-300"
                    onClick={() => setVisibleFeatures(!visibleFeatures)} // Toggle visibility
                  >
                    {visibleFeatures ? "˅" : ">"}
                  </h2>
                </div>
                <hr />
                {/* Content Section with Animation */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    visibleFeatures
                      ? "max-h-screen opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="space-y-2 p-3">
                    {features.map((feature) => (
                      <label
                        key={feature}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          name={feature}
                          value={feature}
                          className="rounded text-blue-600 focus:ring focus:ring-blue-300"
                        />
                        <span className="text-[15px]">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </aside>
          <main className="w-full p-2">
            <Outlet />
          </main>
        </div>
        <div className="w-full bg-slate-100">
          <ShowPhone />
        </div>
      </div>
    </>
  );
};

export default MobileCategory;
