const mongoose = require("mongoose");

const addToCart = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "productType",
  },
  productType: {
    type: String,
    required: true,
    enum: ["phone", "keyboard", "mouse", "tablet", "desktop", "monitor", "laptop", "headphone", "camera"],
  },
  quantity: {
    type: Number,
    default: 1,
  }, 
  userId: {
    type: String,
    required: true,
  },
}, { timestamps: true });


const addToCartModel = mongoose.model("addToCart", addToCart);

module.exports = addToCartModel;
