const mongoose = require("mongoose");

const allproductScheme = mongoose.Schema(
  {
    productId: String, 
    productName: String,
    brandName: String,
    category: String,
    productImage: [String],
    userId: String, 
    price: Number,
    sellingPrice: Number,
  },
  {
    timestamps: true,
  }
);

const allProductModel = mongoose.model("allProducts", allproductScheme);

module.exports = allProductModel;
