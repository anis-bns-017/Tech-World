import { useParams } from "react-router-dom";
const CategoryProduct = () => {
  const params = useParams();
  // (params?.categoryName)
  return (
    <div className="container mx-auto p-4">
      {/* desktop version */}
      <div>
        {/* left side  */}
        <div>
            left side
        </div>

        {/* right side (product) */}
        <div>
            display product
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
