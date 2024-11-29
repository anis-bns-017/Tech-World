const mongoose = require("mongoose");

const mouseSchema = mongoose.Schema(
  {
    productName: String,
    brandName: String,
    category: String,
    productImage: [String],
    key_features: String, 
    description: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      ref: "User",
      required: true,
    },
    number_of_keys: Number,
    connection_type: String, 
    optical_sensor: String, 
    resolution: String, 
    button: String, 
    polling_rate: String, 
    switch_lifecycle: String, 
    tracking_method: String, 
    acceleration: String, 
    color: String, 
    weight: Number, 
    dimension: String, 
    battery_life: String, 
    cable_lenth: String, 
    mechanical_switches: String, 
    built_in_memory: String, 
    price: Number, 
    sellingPrice: Number, 
    warranty: Number, 
  },
  {
    timestamps: true,
  }
);

const mouseModel = mongoose.model("mouse", mouseSchema);

module.exports = mouseModel;