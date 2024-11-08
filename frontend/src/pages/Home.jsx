import { Link } from "react-router-dom";
import BannerProduct from "../components/BannerProduct";
import FeatureCategory from "../components/FeatureCategory";
import TextFlow from "../components/TextFlow";
import AllProducts from "./AllProducts";

const Home = () => {
  return (
    <div className="">
      <BannerProduct />
      <TextFlow />
      <Link to={"/upload"} className="w-auto h-auto bg-slate-400 rounded">Upload</Link>
      <FeatureCategory />
      <AllProducts />
      {/* <CategoryList /> */}
      {/* <BannerProduct /> */}
      {/* <HorizontalCardProduct category = {"airpodes "} heading = "Top's Airpodes"/>
      <HorizontalCardProduct category = {"watches "} heading = "Popular Watches"/> */}

      {/* <VerticalCardProduct category = {"mobiles "} heading = "Mobiles"/>
      <VerticalCardProduct category = {"airpodes "} heading = "Top's Airpodes"/>
      <VerticalCardProduct category = {"watches "} heading = "Popular Watches"/>
      <VerticalCardProduct category = {"mouse "} heading = "Mouse"/>
      <VerticalCardProduct category = {"televisions "} heading = "Televisions"/>
      <VerticalCardProduct category = {"camera "} heading = "Camera & Photography"/>
      <VerticalCardProduct category = {"earphones "} heading = "Wired Earphones"/>
      <VerticalCardProduct category = {"speakers "} heading = "Bluetooth Speakers"/>
      <VerticalCardProduct category = {"refrigerator "} heading = "Refrigerator"/>
      <VerticalCardProduct category = {"trimmers"} heading = "Trimmers"/> */}
    </div>
  );
};

export default Home;
