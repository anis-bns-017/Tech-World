const productModel = require("../../models/productModel");
const laptopModel = require("../../models/Category/laptopModel");
const mouseModel = require("../../models/Category/mouseModel");
const desktopModel = require("../../models/Category/desktopModel");
const tabletModel = require("../../models/Category/tabletModel");
const phoneModel = require("../../models/Category/phoneModel");
const monitorModel = require("../../models/Category/monitorModel");
const keyboardModel = require("../../models/Category/keyboardModel");

const searchProduct = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ success: false, message: "Query is required" });
    }

    const regex = new RegExp(query, "i", "s");

    // Query all models concurrently
    const [phones, laptops, mice, desktops, tablets, monitors, keyboards] = await Promise.all([
      phoneModel.find({
        "$or": [
          { productName: regex },
          { category: regex },
        ],
      }),
      laptopModel.find({
        "$or": [
          { productName: regex },
          { category: regex },
        ],
      }),
      mouseModel.find({
        "$or": [
          { productName: regex },
          { category: regex },
        ],
      }),
      desktopModel.find({
        "$or": [
          { productName: regex },
          { category: regex },
        ],
      }),
      tabletModel.find({
        "$or": [
          { productName: regex },
          { category: regex },
        ],
      }),
      monitorModel.find({
        "$or": [
          { productName: regex },
          { category: regex },
        ],
      }),
      keyboardModel.find({
        "$or": [
          { productName: regex },
          { category: regex },
        ],
      }),
    ]);

    // Combine results from all models
    const allProducts = [
      ...phones,
      ...laptops,
      ...mice,
      ...desktops,
      ...tablets,
      ...monitors,
      ...keyboards,
    ];

    res.json({
      data: allProducts,
      message: "Search Product List",
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = searchProduct;
