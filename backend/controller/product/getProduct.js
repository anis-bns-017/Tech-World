const laptopModel = require("../../models/Category/laptopModel");
const mouseModel = require("../../models/Category/mouseModel");
const desktopModel = require("../../models/Category/desktopModel");
const tabletModel = require("../../models/Category/tabletModel");
const phoneModel = require("../../models/Category/phoneModel");
const monitorModel = require("../../models/Category/monitorModel");
const keyboardModel = require("../../models/Category/keyboardModel");
const headphoneModel = require("../../models/Category/headphoneModel");
const allProductModel = require("../../models/Category/allProductModel");
const cameraModel = require("../../models/Category/cameraModel");

const getProductController = async (req, res) => {
  try {
    // Define the models array
    const models = [
      laptopModel,
      mouseModel,
      desktopModel,
      tabletModel,
      phoneModel,
      monitorModel,
      keyboardModel,
      cameraModel,
      headphoneModel
    ];

    // Fetch products concurrently from all models
    const allProducts = await Promise.all(
      models.map((model) => model.find().sort({ createdAt: -1 }))
    );

    // Flatten the array of products
    const combinedProducts = allProducts.flat();

    // Initialize an array to store all order items
    const orderItems = [];

    // Iterate through each product in combinedProducts
    for (const product of combinedProducts) {
      if (product && product.productName && product.sellingPrice) {
        const orderItem = {
          productId: product?._id,
          category: product.category,
          productName: product.productName,
          brandName: product.brandName,
          userId: product?.userId,
          productImage: product.productImage,
          sellingPrice: product.sellingPrice || 0,
          price: product.price || 0,
        };


        // Create a new instance of allProductModel
        const newOrder = new allProductModel(orderItem);
        await newOrder.save();

        // Attempt to save the new order and handle errors
         
      }  
    }

    res.json({
      message: "All products processed successfully",
      error: false,
      success: true,
      data: combinedProducts, // Return combined results
    });
  } catch (err) {
    console.error("An error occurred during processing:", err);
    res.status(400).json({
      message: err?.message || "An unexpected error occurred.",
      error: true,
      success: false,
    });
  }
};

module.exports = getProductController;
