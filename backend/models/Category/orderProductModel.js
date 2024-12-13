const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      ref: "User",
      required: true,
    },
    customar_firstName: String,
    customar_lastName: String,
    customar_email: String,
    customar_phone: String,
    customar_address: String,
    customar_city: String,
    customar_postCode: String,
    customar_region: String,
    customar_country: String,
    customar_comment: String,
    productId: String,
    produt_name: String,
    currency: String,
    totalAmount: Number,
    totalQuantity: Number,
    transactionId: String,
    payment_status: Boolean,
    payment_system: String,
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

const orderProductModel = mongoose.model("order", orderSchema);

module.exports = orderProductModel;
