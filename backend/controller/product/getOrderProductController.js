const orderProductModel = require("../../models/Category/orderProductModel");

const getOrderProductController = async (req, res) => {
  try {
    const seller = req.userId;

    // Step 1: Fetch orders with orderStatus: "pending"
    const allOrders = await orderProductModel.find({
      orderStatus: "pending",
    });

    const matchingProducts = [];
    const updatePromises = [];

    // Step 2: Iterate through orders to update orderStatus and find matching products
    for (const order of allOrders) {
      // Step 2.1: Update the orderStatus to "delivered"

      // Step 2.2: Find products where productId.userId matches the seller
      if (order.products && Array.isArray(order.products)) {
        for (const product of order.products) {
          if (product?.productId?.userId === seller) {
            matchingProducts.push(allOrders);
          }
        }
      }
      //   order.orderStatus = "pending";
      //   updatePromises.push(order.save());
    }

    // Step 3: Wait for all order status updates to be saved

    // Return the matching products
    res.json({
      data: allOrders,
      message:
        "Successfully updated orders to delivered and retrieved matching products.",
      error: false,
      success: true,
    });

  } catch (err) {
    res.status(500).json({
      message: "An error occurred while processing the orders.",
      error: true,
      success: false,
    });
  }
};

module.exports = getOrderProductController;
