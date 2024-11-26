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
    sensor_type: String, 
    effective_pixel: String, 
    total_pixel: String, 
    aspect_ratio: String, 
    focus_type: String, 
    focus_mode: String, 
    photo: String, 
    metering_model: String, 
    weight: String, 
    mechanical_range: String, 
    exposure_modes: String, 
    exposure_compensation: String, 
    iso_sensitivity: String, 
    white_Balance: String, 
    shutter_speed: String, 
    self_timer: String, 
    view_finder_type: String, 
    view_finder_type: String, 
    view_finder_resultion: String, 
    view_finder_coverage: String, 
    view_finder_eye_point: String, 
    view_finder_magnification: String, 
    continuous_shooting: String, 
    movie_type: String, 
    storage_slot: String, 
    hdmi: String, 
    microphone: String, 
    headPhone: String, 
    wireless: String, 
    flash_maximum_sync_speed: String, 
    dedicated_flash_system: String, 
    red_eye_reduction: String, 
    external_flash_compatibility: String, 
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
