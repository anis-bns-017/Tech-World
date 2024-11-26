const productModel = require("../../models/productModel");
const laptopModel = require("../../models/Category/laptopModel");
const mouseModel = require("../../models/Category/mouseModel");
const desktopModel = require("../../models/Category/desktopModel");
const tabletModel = require("../../models/Category/tabletModel");
const phoneModel = require("../../models/Category/phoneModel");
const monitorModel = require("../../models/Category/monitorModel");
const keyboardModel = require("../../models/Category/keyboardModel");

const getProductController = async (req, res) => {
  try {
    // Fetch laptops and cameras concurrently
    const [laptops, cameras, desktops, tablets, monitors, keyboards] = await Promise.all([
      laptopModel.find().sort({ createdAt: -1 }),
      mouseModel.find().sort({ createdAt: -1 }),
      desktopModel.find().sort({ createdAt: -1 }),
      tabletModel.find().sort({ createdAt: -1 }),
      phoneModel.find().sort({ createdAt: -1 }),
      monitorModel.find().sort({ createdAt: -1 }),
      keyboardModel.find().sort({ createdAt: -1 }),
    ]);

    // Combine the results
    const allProducts = [...laptops, ...cameras, ...desktops, ...tablets, ...monitors, ...keyboards];

    res.json({
      message: "All products",
      error: false,
      success: true,
      data: allProducts, // Combine results in a single array
    });
  } catch (err) {
    res.status(400).json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getProductController;
