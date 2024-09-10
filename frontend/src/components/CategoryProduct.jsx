import { useParams } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import { useState } from "react";
import CategoryWiseProductDisplay from "./CategoryWiseProductDisplay";
import RProduct from "./RProduct";
const CategoryProduct = () => {
  const params = useParams();
  // (params?.categoryName)

  const [data, setData] = useState([]);
  const [loading, SetLoading] = useState(false);

  const fetchData = async (req, res) => {
    const response = await fetch();

    const dataResponse = response.json();
    setData(dataResponse?.data || []);
    console.log("dataResponse", dataResponse);
  };
  return (
    <div className="container mx-auto p-4">
      {/* desktop version */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/* left side  */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          {/* sort by */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-blue-500 border-b pb-1 border-slate-300">
              Sort by
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" />
                <label>Price - Low to High </label>
              </div>

              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" />
                <label>Price - High to Low </label>
              </div>
            </form>
          </div>

          {/* Filter By */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-blue-500 border-b pb-1 border-slate-300">
              Category
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, index) => {
                return (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name={"category"}
                      id={categoryName?.value}
                    />
                    <label htmlFor={categoryName.value}>
                      {categoryName?.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>

        {/* right side (product) */}
        <div>
          {params?.categoryName && (
            <RProduct
              category={params?.categoryName}
              heading="Recommended Product"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
