import { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import displayCurrency from "../helpers/DisplayCurrency";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import AddToCart from "../helpers/AddToCart";
import Context from "../context/Context";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: 0,
    sellingPrice: 0,
  });

  const [loading, setLaoding] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await AddToCart(e, data, id);
    fetchUserAddToCart();
  };

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

  console.log("fist ", params?.id);

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageUrl) => {
    setActiveImage(imageUrl);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  console.log("Data re vai: ", data);

  return (
    <div className="container p-5 bg-white">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 px-5 relative">
            <img
              src={activeImage}
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
              className="h-full w-full object-scale-down mix-blend-multiply"
            />

            {/* Product zoom */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[400px] min-h-[400px] overflow-hidden bg-slate-200 p-1 top-0 -right-[410px]">
                <div
                  className="w-full h-full min-h-[400px] min-w-[400px] mix-blend-multiply scale-150"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
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
                {data?.productImage?.map((imageUrl, index) => {
                  return (
                    <div
                      key={index}
                      className="h-20 w-20 bg-slate-200 rounded p-1"
                    >
                      <img
                        src={imageUrl}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleMouseEnterProduct(imageUrl)}
                        onClick={() => handleMouseEnterProduct(imageUrl)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* product details */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-200 animate-pulse h-6 lg:h-8 rounded-full inline-block w-full"></p>
            <h2 className="text-2xl lg:text-4xl h-6 lg:h-8 bg-slate-200 animate-pulse font-medium w-full"></h2>
            <p className="capitalize text-slate-400 bg-slate-200 min-w-[200px] animate-pulse h-6 lg:h-8 w-full"></p>
            <div className="text-red-600 bg-slate-200 h-6 lg:h-8 animate-pulse flex items-center gap-1 w-full"></div>

            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8 animate-pulse w-full">
              <p className="text-red-600 bg-slate-200 w-full"></p>
              <p className="text-slate-400 line-through bg-slate-200 w-full"></p>
            </div>

            <div className="flex items-center gap-3 my-2 w-full">
              <button className="h-6 lg:h-8 animate-pulse rounded bg-slate-200 w-full"></button>
              <button className="h-6 lg:h-8 animate-pulse rounded bg-slate-200 w-full"></button>
            </div>

            <div>
              <p className="text-slate-600 font-medium my-1 h-6 lg:h-8 animate-pulse rounded bg-slate-200 w-full"></p>
              <p className="h-10 lg:h-12 animate-pulse rounded bg-slate-200 w-full"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl lg:text-1xl text-blue-800 font-medium">
              {data?.productName}
            </h2>
            <div className="flex gap-3">
              <div className="text-slate-500 bg-slate-100 p-2 rounded-full">
                Price:
                <span className="ml-2 text-black text-[15px]">
                  {data?.sellingPrice}
                </span>
              </div>
              <div className="text-slate-500 bg-slate-100 p-2 rounded-full">
                Regular Price:
                <span className="ml-2 text-black text-[15px]">
                  {data?.price}
                </span>
              </div>
              <div className="text-slate-500 bg-slate-100 p-2 rounded-full">
                Status:
                <span className="ml-2 text-black text-[15px]">In Stock</span>
              </div>
              <div className="text-slate-500 bg-slate-100 p-2 rounded-full">
                Product Code:
                <span className="ml-2 text-black text-[15px]">{30330}</span>
              </div>
              <div className="text-slate-500 bg-slate-100 p-2 rounded-full">
                Brand:
                <span className="ml-2 text-black text-[15px]">
                  {data?.brandName}
                </span>
              </div>
            </div>

            <div className="w-[60vh]">
              <div className="text-xl mb-3">Key Features </div>
              <div>{data?.key_features}</div>
            </div>

            <div className="text-red-700 mb-2">
              <div>View More Details</div>
              <div className="border-[1px] border-red-700 w-[21vh] hover:border-[1.5px]"></div>
            </div>

            <div className="text-red-600 flex items-center gap-1 m-3">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaRegStarHalfStroke />
            </div>

            <div className="flex items-center gap-3">
              <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:text-white hover:bg-red-600">
                Buy
              </button>
              <button
                className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-white font-medium bg-red-600 hover:text-red-600 hover:bg-white transition-all"
                onClick={(e) => handleAddToCart(e, params?.id)}
              >
                Add to Cart
              </button>
            </div>

            {/* <div>
              <p className="text-slate-600 font-medium my-1">Description</p>
              <p>{data?.description}</p>
            </div> */}
          </div>
        )}
      </div>

      <div className=" bg-slate-100 p-5 w-screen -ml-5 rounded-md shadow-inherit">
        <div className="flex gap-5 font-[5px] ml-3">
          <div className="bg-red-600 text-white p-2 rounded-md">
            Specification
          </div>
          <div className="bg-white text-black p-2 rounded-md hover:bg-red-600 hover:text-white">
            Description
          </div>
          <div className="bg-white text-black p-2 rounded-md hover:bg-red-600 hover:text-white">
            Qestion
          </div>
          <div className="bg-white text-black p-2 rounded-md hover:bg-red-600 hover:text-white">
            Review
          </div>
        </div>

        <div className="bg-white w-[150vh] h-fit ml-3 mt-5 rounded-lg">
          <div className="p-5">
            <div className="text-xl font-semibold">Specification</div>
            <div className="text-blue-800 font-semibold mt-7 w-full bg-slate-100 p-2">
              <p className="ml-2">Display</p>
            </div>
            <div className="flex mt-1 w-full bg-white p-2">
              <p className="text-slate-600 w-[100px]">Size</p>
              <p className="ml-[40vh]">{data?.display_size}</p>
            </div>
            <div className="border-[0.1px] border-slate-200 w-full"></div>

            <div className="flex mt-1 w-full bg-white p-2">
              <p className="text-slate-600 w-[100px]">Type</p>
              <p className="ml-[40vh]">{data?.display_type}</p>
            </div>
            <div className="border-[0.1px] border-slate-200 w-full"></div>

            <div className="flex mt-1 w-full bg-white p-2">
              <p className="text-slate-600 w-[100px]">Resolution</p>
              <p className="ml-[40vh]">{data?.screen_resolution}</p>
            </div>
            <div className="border-[0.1px] border-slate-200 w-full"></div>

            <div className="flex mt-1 w-full bg-white p-2">
              <p className="text-slate-600 w-[100px]">Refresh Rate</p>
              <p className="ml-[40vh]">{data?.refresh_rate}</p>
            </div>
            <div className="border-[0.1px] border-slate-200 w-full"></div>

            <div className="flex mt-1 w-full bg-white p-2">
              <p className="text-slate-600 w-[100px]">Protection</p>
              <p className="ml-[40vh]">{data?.protection}</p>
            </div>
            <div className="border-[0.1px] border-slate-200 w-full"></div>

            <div className="flex mt-1 w-full bg-white p-2">
              <p className="text-slate-600 w-[100px]">Features</p>
              <p className="ml-[40vh]">{data?.display_features}</p>
            </div>
            <div className="border-[0.1px] border-slate-200 w-full"></div>

            <div className="text-blue-800 font-semibold mt-7 w-full bg-slate-100 p-2">
              <p className="ml-2">Processor</p>
            </div>
            <div className="flex mt-1 w-full bg-white p-2">
              <p className="text-slate-600 w-[100px]">Chipset</p>
              <p className="ml-[40vh]">{data?.chipset}</p>
            </div>
            <div className="border-[0.1px] border-slate-200 w-full"></div>

            <div className="flex mt-1 w-full bg-white p-2">
              <p className="text-slate-600 w-[100px]">CPU Type</p>
              <p className="ml-[40vh]">{data?.cpu_type}</p>
            </div>
            <div className="border-[0.1px] border-slate-200 w-full"></div>

            <div className="flex mt-1 w-full bg-white p-2">
              <p className="text-slate-600 w-[100px]">CPU Speed</p>
              <p className="ml-[40vh]">{data?.cpu_speed}</p>
            </div>
            <div className="border-[0.1px] border-slate-200 w-full"></div>

            <div className="flex mt-1 w-full bg-white p-2">
              <p className="text-slate-600 w-[100px]">GPU</p>
              <p className="ml-[40vh]">{data?.gpu}</p>
            </div>
            <div className="border-[0.1px] border-slate-200 w-full"></div>

            <div className="text-blue-800 font-semibold mt-7 w-full bg-slate-100 p-2">
              <p className="ml-2">Rear Camera</p>
            </div>
            <div className="flex mt-1 w-full bg-white p-2">
              <p className="text-slate-600 w-[120px]">Resolution</p>
              <p className="ml-[40vh]">{data?.rear_camera_resolution}</p>
            </div>
            <div className="border-[0.1px] border-slate-200 w-full"></div>

            <div className="flex mt-1 w-full bg-white p-2">
              <p className="text-slate-600 w-[120px]">Features</p>
              <p className="ml-[40vh]">{data?.rear_camera_features}</p>
            </div>
            <div className="border-[0.1px] border-slate-200 w-full"></div>

            <div className="flex mt-1 w-full bg-white p-2">
              <p className="text-slate-600 w-[120px]">Video Recording</p>
              <p className="ml-[40vh]">{data?.rear_video_recording}</p>
            </div>
            <div className="border-[0.1px] border-slate-200 w-full"></div>

            <div className="text-blue-800 font-semibold mt-7 w-full bg-slate-100 p-2">
              <p className="ml-2">Front Camera</p>
            </div>

            <div className="flex mt-1 w-full bg-white p-2">
              <p className="text-slate-600 w-[120px]">Resolution</p>
              <p className="ml-[40vh]">{data?.front_camera_resolution}</p>
            </div>
            <div className="border-[0.1px] border-slate-200 w-full"></div>

            <div className="flex mt-1 w-full bg-white p-2">
              <p className="text-slate-600 w-[120px]">Video Recording</p>
              <p className="ml-[40vh]">{data?.front_video_recording}</p>
            </div>
            <div className="border-[0.1px] border-slate-200 w-full"></div>

            <div className="text-blue-800 font-semibold mt-7 w-full bg-slate-100 p-2">
              <p className="ml-2">Warranty Information</p>
            </div>

            <div className="flex mt-1 w-full bg-white p-2">
              <p className="text-slate-600 w-[120px]">Warranty</p>
              <p className="ml-[40vh]">
                {data?.warranty +
                  "-year Official warranty (To claim please visit the nearest Samsung Service Center)"}
              </p>
            </div>
            <div className="border-[0.1px] border-slate-200 w-full"></div>
          </div>
        </div>

        <div className="bg-white w-[150vh] h-fit ml-3 mt-5 rounded-lg">
          <div className="text-xl font-semibold p-5">Description</div>
          <p className="ml-5 text-xl font-semibold">{data?.productName}</p>
          <p className="ml-5 mt-1 py-3">{data?.description}</p>
        </div>
      </div>

      {/* {data?.category && (
        <CategoryWiseProductDisplay
          category={data?.category}
          heading="Recommended Product"
        />
      )} */}
    </div>
  );
};

export default ProductDetails;
