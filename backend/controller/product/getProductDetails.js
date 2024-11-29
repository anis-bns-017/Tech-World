const cameraModel = require("../../models/Category/cameraModel");
const headphoneModel = require("../../models/Category/headphoneModel");
const keyboardModel = require("../../models/Category/keyboardModel");
const mouseModel = require("../../models/Category/mouseModel");
const phoneModel = require("../../models/Category/phoneModel");
const monitorModel = require("../../models/Category/monitorModel");
const laptopModel = require("../../models/Category/laptopModel");
const desktopModel = require("../../models/Category/desktopModel");
const tabletModel = require("../../models/Category/tabletModel");

// Add all models to the array
const models = [
  cameraModel,
  headphoneModel,
  keyboardModel,
  mouseModel,
  phoneModel,
  monitorModel,
  laptopModel,
  desktopModel,
  tabletModel,
];

const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.body;

    let product = null;

    // Iterate over all models to find the product
    for (const model of models) {
      product = await model.findById(productId);
      if (product) break; // Exit the loop if the product is found
    }

  
    if (!product) {
      return res.status(404).json({
        message: "Product not found!",
        success: false,
        error: true,
      });
    }

    res.json({
      data: product,
      message: "OK",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getProductDetails;
