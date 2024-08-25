import { useState } from "react";

const HorizontalCardProduct = ({ category }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = Array(13).fill(null);

  return (
    <div className="">
      <div className="w-full max-w-full">product</div>
    </div>
  );
};

export default HorizontalCardProduct;
