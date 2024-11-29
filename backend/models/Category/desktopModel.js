const mongoose = require("mongoose");

const desktopSchema = mongoose.Schema(
  {
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    key_features: String, 
    description: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      ref: "User",
      required: true,
    },
    processor: String, 
    processor_warranty: String, 
    motherboard: String, 
    motherboard_warranty: String, 
    ram: String, 
    ram_warranty: String, 
    storage: String, 
    storage_warranty: String, 
    casing: String, 
    casing_warranty: String, 
    price: Number,
    sellingPrice: Number,
  },
  {
    timestamps: true,
  }
);

const desktopModel = mongoose.model("desktop", desktopSchema);

module.exports = desktopModel;