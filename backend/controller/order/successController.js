const orderProductModel = require("../../models/Category/orderProductModel");

const successController = async (req, res) => {
  try {
    // Extract transactionId from req.params
    const transacID = req.params.transactionId;

    // Search for the order using transactionId
    const existingOrder = await orderProductModel.findOne({
      transactionId: transacID,
    });

    if (!existingOrder) {
      return res.status(404).json({
        message: "Order not found",
        error: true,
        success: false,
      });
    }

    // Update payment_status
    existingOrder.payment_status = true;
    await existingOrder.save();

    // Redirect to success page
    return res.redirect(`http://localhost:5173/payment-success/${transacID}`);
  } catch (err) {
    res.status(400).json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = successController;
