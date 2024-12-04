import { useLocation } from "react-router-dom";

const Go = () => {
  const location = useLocation();
  const data = location.state?.product;
  const productConfig = [
    {
      category: "phone",
      link: "upload-phone",
    },
    {
      category: "tablet",
      link: "upload-tablet",
    },
    {
      category: "laptop",
      link: "upload-laptop",
    },
    {
      category: "camera",
      link: "upload-camera",
    },
    {
      category: "headphone",
      link: "upload-headphone",
    },
    {
      category: "desktop",
      link: "upload-desktop",
    },
    {
      category: "monitor",
      link: "upload-monitor",
    },
  ];

  // Finding the corresponding link based on the product category
  const currentProductConfig = productConfig.find(
    (config) => config.category === data?.category
  );

  console.log("asdfas ", data?.category);

  return <div>Go</div>;
};

export default Go;
