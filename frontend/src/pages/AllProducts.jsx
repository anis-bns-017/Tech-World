import { useState } from "react"
import UploadProduct from "../components/UploadProduct"

 
const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between">
        <h2 className="text-lg font-bold"> All Products </h2>
        <button className="border-2 border-red-600 text-red-600 hover:text-white hover:bg-red-800 py-2 px-4 rounded-full transition-all" onClick={() => setOpenUploadProduct(true)}>Upload a product</button>
      </div>

      {/* Upload  */}
      {
        openUploadProduct && (
          <UploadProduct onClose = {()=> setOpenUploadProduct(false)}/>
        )
      }
      
    </div>
  )
}

export default AllProducts