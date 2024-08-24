import BannerProduct from "../components/BannerProduct"
import CategoryList from "../components/CategoryList"

 
const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <CategoryList />
      <BannerProduct />
    </div>
  )
}

export default Home
