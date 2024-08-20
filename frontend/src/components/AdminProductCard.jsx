import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import { useState } from "react";

const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white rounded p-4">
      <div className="w-40">
        <img
          className="fit mx-auto"
          src={data?.productImage[0]}
          width={120}
          height={120}
        />
        <h1>{data.productName}</h1>
        <div>
          <div>
            {data.sellingPrice}
          </div>

          <div
            onClick={() => setEditProduct(true)}
            className="cursor-pointer ml-auto w-fit p-2 bg-green-200 hover:bg-green-700 rounded-full hover:text-white"
          >
            <MdModeEdit />
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
