const mongoose = require("mongoose");

const cameraSchema = mongoose.Schema(
  {
    productName: String,
    brandName: String,
    category: String,
    productImage: [String],
    key_features: String,
    description: String,
    image_sensor: String, 
    sensor_resolution: String, 
    image: String, 
    video: String, 
    display: String, 
    usb_port: String, 
    charging_interface: String, 
    battery_type: String, 
    battery_capacity: Number, 
    wifi: String, 
    water_resistant: String, 
    hdr_mode: String, 
    slow_motion_recording: String, 
    price: Number,
    sellingPrice: Number,
    warranty: Number,
  },
  {
    timestamps: true,
  }
);

const cameraModel = mongoose.model("camera", cameraSchema);

module.exports = cameraModel;
