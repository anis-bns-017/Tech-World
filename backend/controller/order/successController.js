const addToCartModel = require("../../models/cartProduct");
const orderHistoryModel = require("../../models/Category/orderHistoryModel");
const orderProductModel = require("../../models/Category/orderProductModel");

const successController = async (req, res) => {
  try {
    // Extract transactionId from req.params
    const transacID = req.params.transactionId;

    // Search for the order using transactionId
    const existingOrder = await orderProductModel.findOne({
      transactionId: transacID,
    });

    const ordered = existingOrder.products;
    console.log("ki ekta obostha: ", ordered);
    for (const product of ordered) {
      const payload = {
        product: product,
      };
      const newOrder = new orderHistoryModel(payload);
      await newOrder.save();
      await addToCartModel.deleteOne({ productId: product?.productId?._id });
    }

    if (!existingOrder) {
      return res.status(404).json({
        message: "Order not found",
        error: true,
        success: false,
      });
    }

    // const allProduct = await addToCartModel
    //   .find({ userId: currentUser,
    //     payment_status: false
    //    }) // Filter by the current user's ID
    //   .populate({
    //     path: "productId",
    //     select: "productName price productImage category sellingPrice",
    //   });

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
