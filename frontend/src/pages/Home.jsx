import BannerProduct from "../components/BannerProduct"
import CategoryList from "../components/CategoryList"
import HorizontalCardProduct from "../components/HorizontalCardProduct"
 
const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category = {"airpodes"}/>
    </div>
  )
}

export default Home
