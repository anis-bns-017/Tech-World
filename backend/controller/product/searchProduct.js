const productModels = [
  require("../../models/Category/phoneModel"),
  require("../../models/Category/laptopModel"),
  require("../../models/Category/mouseModel"),
  require("../../models/Category/desktopModel"),
  require("../../models/Category/tabletModel"),
  require("../../models/Category/monitorModel"),
  require("../../models/Category/keyboardModel"),
];

const searchProduct = async (req, res) => {
  try {
    const query = req.query.q;
    // console.log("Search query:", query);

    if (!query || typeof query !== "string") {
      return res
        .status(400)
        .json({
          success: false,
          message: "Query is required and must be a string",
        });
    }

    const regex = new RegExp(query, "i"); // Case-insensitive search

    // Query all models concurrently
    const results = await Promise.all(
      productModels.map(
        (model) =>
          model
            .find({
              $or: [{ productName: regex }, { category: regex }],
            })
            .limit(10) // Limit results for each model
            .sort({ productName: 1 }) // Sort by product name (alphabetical)
      )
    );

    // Flatten the results from all models into a single array
    const allProducts = results.flat();

    res.json({
      data: allProducts,
      message: "Search Product List",
      error: false,
      success: true,
    });
  } catch (err) {
    console.error("Error searching products:", err);
    res.status(500).json({
      message: err.message || "An error occurred during product search",
      error: true,
      success: false,
    });
  }
};

module.exports = searchProduct;
