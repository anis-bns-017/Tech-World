import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common";
const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const [loading, setLaoding] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const productImageListLoading = new Array(4).fill(null);

  const params = useParams();

  const fetchProductDetails = async () => {
    setLaoding(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLaoding(false);

    const dataResponse = await response.json();
    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data?.productImage[0]);
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  console.log("activeImage: ", activeImage);
  const handleMouseEnterProduct = (imageUrl) => {
    setActiveImage(imageUrl);
  };
  return (
    <div className="container mx-auto p-4">
      {/* product image */}
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200">
            <img
              src={activeImage}
              className="h-full w-full object-scale-down mix-blend-multiply"
            />
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading?.map(() => {
                  return (
                    <div
                      key={"loadingImage"}
                      className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((imageUrl) => {
                  return (
                    <div
                      key={imageUrl}
                      className="h-20 w-20 bg-slate-200 rounded p-1"
                    >
                      <img
                        src={imageUrl}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleMouseEnterProduct(imageUrl)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* product details */}
        <div> Product Details </div>
      </div>
    </div>
  );
};

export default ProductDetails;
