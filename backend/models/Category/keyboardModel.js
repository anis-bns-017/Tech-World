const mongoose = require("mongoose");

const keyboardSchema = mongoose.Schema(
  {
    productName: String,
    brandName: String,
    category: String,
    productImage: [String],
    key_features: String,
    description: String,
    wired_wiredless: String, 
    keys: String, 
    polling_rate: String, 
    switch_color: String, 
    lighting: String, 
    others: String, 
    system_requirements: String, 
    cabel_length: String, 
    interface: String, 
    color: String, 
    dimension: String, 
    weight: Number, 
    price: Number,
    sellingPrice: Number,
    warranty: Number,
  },
  {
    timestamps: true,
  }
);

const keyboardModel = mongoose.model("keyboard", keyboardSchema);

module.exports = keyboardModel;
