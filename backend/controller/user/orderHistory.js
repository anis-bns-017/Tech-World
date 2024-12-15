const orderHistoryModel = require("../../models/Category/orderHistoryModel");

const orderHistory = async (req, res) => {
  try {
    const currentUser = req.userId;

    // Find all products and populate dynamically based on productType
    const allProducts = await orderHistoryModel.find(); // Filter by the current user's ID

    console.log("LL: ", allProducts);
    res.json({
      data: allProducts,
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

module.exports = orderHistory;
