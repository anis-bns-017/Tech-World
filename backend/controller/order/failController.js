const orderProductModel = require("../../models/Category/orderProductModel");

const failController = async (req, res) => {
  try {
    // Extract transactionId from req.params
    const transacID = req.params.transactionId;

    // Search and delete the order using transactionId
    const deletedOrder = await orderProductModel.findOneAndDelete({
      transactionId: transacID,
    });

    if (!deletedOrder) {
      return res.status(404).json({
        message: "Order not found",
        error: true,
        success: false,
      });
    }

    // Redirect to failure page with transactionId
    return res.redirect(`http://localhost:5173/payment-fail/${transacID}`);
  } catch (err) {
    res.status(400).json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = failController;
