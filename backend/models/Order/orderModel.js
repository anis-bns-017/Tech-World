const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      firstName: String,
      lastName: STring,
      email: String,
      phone: String,
      address: String,
      city: String,
      postCode: String,
      region: String,
      country: String,
      comment: String,
    },
    orderItems: [
      {
        productId: String,
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
    totalAmount: Number,
    totalQuantity: Number,
    paymentInfo: {
      status: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
      },
      transactionId: String, // Store transaction ID for payment tracking
      method: {
        type: String,
        enum: ["sslcommerz", "paypal", "stripe"],
        default: "sslcommerz",
      },
    },
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    payment_method: String,
    delivery_method: String,
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
