const mongoose = require("mongoose");

const monitorSchema = mongoose.Schema(
  {
    productName: String,
    brandName: String,
    category: String,
    productImage: [String],
    key_features: String, 
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      ref: "User",
      required: true,
    },
    description: String,
    display_size: String, 
    display_type: String, 
    panel_type: String, 
    resolution: String, 
    aspect_ratio: String, 
    viewing_ratio: String, 
    brightness: String, 
    contrast_ratio: String, 
    refresh_rate: String, 
    color_support: String, 
    response_time: String, 
    curvature: String, 
    vga: String, 
    hdmi: String, 
    vesa_wall_mount: String, 
    color: String, 
    dimension: String, 
    weight: String, 
    power_consumption: String, 
    voltage: Number, 
    price: Number, 
    sellingPrice: Number, 
    warranty: Number, 
  },
  {
    timestamps: true,
  }
);

const monitorModel = mongoose.model("monitor", monitorSchema);

module.exports = monitorModel;