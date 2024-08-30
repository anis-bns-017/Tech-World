import { useLocation } from "react-router-dom";
import SummaryApi from "../common";
import { useEffect } from "react";

const SearchProduct = () => {
  const query = useLocation();
  console.log("query: ", query.search);

  const fetchProduct = async () => {
    const response = await fetch(SummaryApi.searchProduct.url + query.search);
    const dataResponse = await response.json();

    console.log("DataReponse: ", dataResponse);
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return <div>SearchProduct</div>;
};

export default SearchProduct;
