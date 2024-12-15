const mongoose = require("mongoose");

const orderHistorySchema = mongoose.Schema(
  {
    product: {
      // Embedding full user data
      type: Object,
      required: true, // Ensure user details are always present
    },
  },
  { timestamps: true }
);

const orderHistoryModel = mongoose.model("orderHistory", orderHistorySchema);

module.exports = orderHistoryModel;
