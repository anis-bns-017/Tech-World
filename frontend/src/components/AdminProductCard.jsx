import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import { useState } from "react";

const AdminProductCard = ({ data }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white rounded p-4">
      <img src={data?.productImage[0]} width={120} height={120} />
      <h1>{data.productName}</h1>
      <div onClick={() => setEditProduct(true)} className="cursor-pointer ml-auto w-fit p-2 bg-green-200 hover:bg-green-700 rounded-full hover:text-white">
        <MdModeEdit />
      </div>

      {editProduct && <AdminEditProduct productData={data} onClose={() => setEditProduct(false)}/>}
    </div>
  );
};

export default AdminProductCard;
