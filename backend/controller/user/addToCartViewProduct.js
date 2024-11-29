const addToCartModel = require("../../models/cartProduct");

const addToCartViewProduct = async (req, res) => {
  try {
    const currentUser = req.userId;

    // Find all products and populate dynamically based on productType
    const allProduct = await addToCartModel
      .find({ userId: currentUser }) // Filter by the current user's ID
      .populate({
        path: "productId",
        select: "productName price productImage category sellingPrice",
      }); // Automatically uses refPath to fetch the correct model


    res.json({
      data: allProduct,
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err?.message || "Something went wrong",
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartViewProduct;
