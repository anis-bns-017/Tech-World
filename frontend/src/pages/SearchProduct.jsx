import { useLocation } from "react-router-dom";
import SummaryApi from "../common";
import { useEffect, useState } from "react";
import VerticalCard from "../components/VerticalCard";

const SearchProduct = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Parse the search query from the URL
  const searchQuery = location.search
  console.log("asdfasdf: ", location.search);

  const fetchProduct = async () => {
    if (!searchQuery) return; // If there's no search query, don't fetch data
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.searchProduct.url + searchQuery);
      const dataResponse = await response.json();
      setData(dataResponse.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [searchQuery]); // Re-run fetch when the search query changes

  return (
    <div className="container mx-auto p-4">
      {loading && <p className="text-lg text-center">Loading......</p>}
      <p className="text-lg font-semibold">Search Results: {data.length} </p>

      {data.length === 0 && !loading && (
        <p className="bg-white text-lg text-center p-4">No Data Found</p>
      )}

      {data.length !== 0 && !loading && (
        <VerticalCard loading={loading} data={data} />
      )}
    </div>
  );
};

export default SearchProduct;
