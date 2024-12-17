import { useLocation } from "react-router-dom";

const OrderProductDetails = () => {
  const location = useLocation();
  const { order } = location.state || {}; // Access the passed product data

  console.log("asdfa: ", order);

  if (!order) {
    return <p>No product data found.</p>; // Handle cases where no product is passed
  }
  return (
    <div className="mt-[4rem] w-[30rem] h-[30rem] shadow-lg bg-blue-900 p-3 rounded-lg">
      <div className="text-2xl text-yellow-500">Buyer Details</div>
      <div className="mt-5 font-semibold font-serif text-white">
        <div>
          Name: {order?.customar_firstName + " " + order?.customar_lastName}
        </div>
        <div>Email: {order?.customar_email}</div>
        <div>Phone: {order?.customar_phone}</div>
        <div>Address: {order?.customar_address}</div>
        <div>City: {order?.customar_city}</div>
        <div>State/Region: {order?.customar_region}</div>
        <div>Post Code: {order?.customar_postCode}</div>
        <div>Country: {order?.customar_country}</div>
        <div>Transaction No: {order?.transactionId}</div>
        <div>Total Price: {order?.totalAmount}</div>
        <div>Total Number of Products: {order?.totalQuantity}</div>
      </div>
    </div>
  );
};

export default OrderProductDetails;
