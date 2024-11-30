import { useEffect, useState } from "react";

import SummaryApi from "../../common";
import AdminProductCard from "../AdminProductCard";

const ShowPhone = () => {
  const [allMobiles, setAllMobiles] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allMobiles.url);
    const dataResponse = await response.json();

    setAllMobiles(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);
  return (
    <div className="gap-3 bg-slate-200">
      <div className="h-[10vh] w-[165vh] bg-white p-2 shadow-lg rounded-md flex justify-between ml-10">
        <h2 className="text-3xl">Phone</h2>
        <div className="flex gap-5">
          <div>
            <spa>Show: </spa>
            <select className="ml-2 rounded border border-gray-300 p-2">
              <option value="20">20</option>
              <option value="40">40</option>
              <option value="60">60</option>
              <option value="75">75</option>
              <option value="90">90</option>
            </select>
          </div>
          <div>
            <span>Sort By:</span>
            <select className="ml-2 rounded border border-gray-300 p-2">
              <option value="default">Default</option>
              <option value="low-to-high">Price (Low to High)</option>
              <option value="high-to-low">Price (High to Low)</option>
            </select>
          </div>
        </div>
      </div>
      <div className="pl-1 h-screen">
        <div className="flex items-center flex-wrap my-4 ml-8 h-[calc(100vh-190px)] overflow-y-scroll scrollbar-none">
          {allMobiles.map((product, index) => {
            return (
              <AdminProductCard
                data={product}
                key={index + "allproducts"}
                fetchData={fetchAllProduct}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShowPhone;
