const mongoose = require("mongoose");

const headphoneSchema = mongoose.Schema(
  {
    productName: String,
    brandName: String,
    category: String,
    productImage: [String],
    key_features: String, 
    description: String,
    frequency_range: String, 
    sensitivity: String, 
    cable_lenght: String, 
    impedance: String, 
    others: String, 
    driver_diameter: String, 
    connectivity: String, 
    battery_capacity: String, 
    battery_life: String, 
    input_jack: String, 
    system_requirement: String, 
    noise_ratio: String, 
    pickup_pattern: String, 
    weight: String, 
    color: String, 
    mic_frequency: String, 
    mic_sensitivity: String, 
    price: Number, 
    sellingPrice: Number, 
    warranty: Number, 
  },
  {
    timestamps: true,
  }
);

const headphoneModel = mongoose.model("headphone", headphoneSchema);

module.exports = headphoneModel;