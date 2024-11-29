const mongoose = require("mongoose");

const phoneSchema = mongoose.Schema(
  {
    productName: String,
    brandName: String,
    category: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      ref: "User",
      required: true,
    },
    productImage: [String],
    key_features: String,
    description: String,
    display_size: String,
    display_type: String,
    screen_resolution: String,
    refresh_rate: String,
    protection: String,
    display_features: String,
    chipset: String,
    cpu_type: String,
    cpu_speed: String,
    gpu: String,
    ram: String,
    internal_storage: String,
    card_slot: String,
    rear_camera_resolution: String,
    rear_camera_features: String,
    rear_video_recording: String,
    front_camera_resolution: String,
    front_video_recording: String,
    speaker: String,
    sim: String,
    network: String,
    wifi: String,
    bluetooth: String,
    gps: String,
    usb: String,
    audio_jack: String,
    opearating_system: String,
    finger_print: String,
    sensor: String,
    battery: String,
    dimension: String,
    color: String,
    price: Number,
    sellingPrice: Number,
    warranty: String,
  },
  {
    timestamps: true,
  }
);

const phoneModel = mongoose.model("phone", phoneSchema);

module.exports = phoneModel;
