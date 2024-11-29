import SummaryApi from "../common";
import { toast } from "react-toastify";

const AddToCart = async (e, data, userId) => {
  e?.stopPropagation();
  e?.preventDefault();

  const id = data?._id; // Extract product ID
  const category = data?.category; // Extract category

  // Ensure category is available
  if (!category) {
    toast.error("Category is not defined!");
    return;
  }

 

  const response = await fetch(SummaryApi.addToCartProduct.url, {
    method: SummaryApi.addToCartProduct.method,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({userId: userId, productId: id, productType: category}), // Include category in body
  });

  const responseData = await response.json();

  if (responseData.success) {
    toast.success(responseData.message);
  }

  if (responseData.error) {
    toast.error(responseData.message);
  }

  return responseData;
};

export default AddToCart;
