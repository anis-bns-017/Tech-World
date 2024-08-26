import BannerProduct from "../components/BannerProduct"
import CategoryList from "../components/CategoryList"
import HorizontalCardProduct from "../components/HorizontalCardProduct"
import VerticalCardProduct from "../components/VerticalCardProduct"

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category = {"airpodes "} heading = "Top's Airpodes"/>
      <HorizontalCardProduct category = {"watches "} heading = "Popular Watches"/>
      <VerticalCardProduct category = {"mobiles "} heading = "Mobiles"/>
      <VerticalCardProduct category = {"mouse "} heading = "Mouse"/>
      <VerticalCardProduct category = {"televisions "} heading = "Televisions"/>
      <VerticalCardProduct category = {"camera "} heading = "Camera & Photography"/>
      <VerticalCardProduct category = {"earphones "} heading = "Wired Earphones"/>
      <VerticalCardProduct category = {"speakers "} heading = "Bluetooth Speakers"/>
      <VerticalCardProduct category = {"refrigerator "} heading = "Refrigerator"/>
      <VerticalCardProduct category = {"trimmers"} heading = "Trimmers"/>
    </div>
  )
}

export default Home
