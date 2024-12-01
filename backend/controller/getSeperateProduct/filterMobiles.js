const phoneModel = require("../../models/Category/phoneModel");

const filterProductController = async (req, res) => {
  try {
    const {
      brands = [],
      displaySize = [],
      displayType = [],
      features = [],
      ram = [],
      storage = [],
      chipset = [],
      price = {},
    } = req.body;

    // Build dynamic query object
    const query = {};
    // Brand filter
    if (brands.length > 0) query.brandName = { $in: brands };

    // Display size filter
    if (displaySize.length > 0) {
      query.display_size = { $in: displaySize };
    }

    // Display type filter
    if (displayType.length > 0) {
      query.display_type = { $in: displayType };
    }

    // Features filter
    if (features.length > 0) {
      query.features = { $all: features }; // Matches all selected features
    }

    // RAM filter
    if (ram.length > 0) {
      query.ram = { $in: ram };
    }

    // Storage filter
    if (storage.length > 0) {
      query.internal_storage = { $in: storage };
    }

    // Chipset filter
    if (chipset.length > 0) {
      query.chipset = { $in: chipset };
    }

    // Price range filter
    if (price.min !== undefined && price.max !== undefined) {
      query.sellingPrice = { $gte: price.min, $lte: price.max };
    }

    // Find products based on the query
    const allMobiles = await phoneModel.find(query).sort({ createdAt: -1 });

    // console.log("Alhamdulillah: ", allMobiles);

    res.json({
      data: allMobiles,
      message: "Filtered products retrieved successfully.",
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err.message || "Failed to retrieve products.",
      error: true,
      success: false,
    });
  }
};

module.exports = filterProductController;
