import { useEffect, useState } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false);
    setCategoryProduct(dataResponse.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="w-full h-[50px] bg-white relative -mt-3 justify-center items-center">
      <div className="flex gap-3 text-[15px] mx-11 mt-3 text-center items-center absolute">
        {loading
          ? categoryLoading?.map((el, index) => {
              return (
                <div
                  key={"categoryLoading" + index}
                  className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                ></div>
              );
            })
          : categoryProduct?.map((product, index) => {
              return (
                <Link
                  to={"/product-category/" + product.category}
                  key={product?.category}
                  className="cursor-pointer"
                >
                  <p className="cursor-pointer hover:text-red-500">{product?.category}</p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
