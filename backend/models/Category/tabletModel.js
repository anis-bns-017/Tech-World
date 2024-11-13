const mongoose = require("mongoose");

const tabletSchema = mongoose.Schema(
  {
    productName: String,
    brandName: String,
    category: String,
    productImage: [String],
    key_features: String,
    description: String,
    display_size: String,
    display_type: String,

    display_resolution: String,
    processor: String,
    ram: String,
    storage: String,
    connectivity: String, 
    operating_system: String, 
    audio: String, 
    dimension: String, 
    weight: Number, 
    sim: String, 
    color: String, 
    rear_camera: Number, 
    front_camera: Number, 
    battery_type: String, 
    battery_capacity: String, 
    bluetooth: String, 
    GPS: String, 
    sensor: String, 
    usb: String, 
    wlan: String, 
    price: Number,
    sellingPrice: Number,
    warranty: Number,
  },
  {
    timestamps: true,
  }
);

const tabletModel = mongoose.model("tablet", tabletSchema);

module.exports = tabletModel;
