const mongoose = require("mongoose");
const uploadProductPermission = require("../../helpers/permission");
const laptopModel = require("../../models/Category/laptopModel");

async function updateLaptopController(req, res) {
  try {
    const {
      productName,
      brandName,
      category,
      productImage,
      key_features,
      description,
      processor_brand,
      processor_model,
      processor_frequency,
      processor_core,
      processor_thread,
      cpu_cache,
      chipset,
      chipset_model,
      display,
      display_type,
      display_resolution,
      touch_screen,
      refresh_rate,
      display_features,
      ram,
      ram_type,
      bus_speed,
      total_ram_slot,
      max_ram_capacity,
      storage_type,
      storage_capacity,
      extra_m2_slot,
      storage_upgrade,
      graphics_model,
      graphics_memory,
      graphics_type,
      keyboard_type,
      touchPad,
      webcam,
      speaker,
      microphone,
      audio_features,
      optical_drive,
      card_reader,
      hdmi_port,
      usb_port,
      usb_type_c,
      microphone_port,
      lan,
      wifi,
      bluetooth,
      fingerPrint,
      camera_privacy_shutter,
      security_chip,
      operating_system,
      battery_capacity,
      adapter_type,
      dimensions,
      weight,
      body_material,
      warranty,
      price,
      sellingPrice,
    } = req.body?.data;

    // Check for permission
    if (!uploadProductPermission(req.userId)) {
      console.log("Permission denied for user:", req.userId);
      return res.status(403).json({
        message: "Permission denied",
        error: true,
        success: false,
      });
    }

    // Validate `productId`
    const { productId, ...updateData } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      console.error("Invalid Product ID:", productId);
      return res.status(400).json({
        message: "Invalid Product ID",
        error: true,
        success: false,
      });
    }

    // Check if the product exists
    const existingProduct = await laptopModel.findById(productId);
    if (!existingProduct) {
      console.error("Product not found for ID:", productId);
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    // Build the payload
    const payload = {
      ...(productName && { productName }),
      ...(brandName && { brandName }),
      ...(category && { category }),
      ...(productImage?.length && { productImage }),
      ...(key_features && { key_features }),
      ...(description && { description }),
      ...(processor_brand && { processor_brand }),
      ...(processor_model && { processor_model }),
      ...(processor_frequency && { processor_frequency }),
      ...(processor_core && { processor_core }),
      ...(processor_thread && { processor_thread }),
      ...(cpu_cache && { cpu_cache }),
      ...(chipset && { chipset }),
      ...(chipset_model && { chipset_model }),
      ...(display && { display }),
      ...(display_type && { display_type }),
      ...(display_resolution && { display_resolution }),
      ...(touch_screen && { touch_screen }),
      ...(refresh_rate && { refresh_rate }),
      ...(display_features && { display_features }),
      ...(ram && { ram }),
      ...(ram_type && { ram_type }),
      ...(bus_speed && { bus_speed }),
      ...(total_ram_slot && { total_ram_slot }),
      ...(max_ram_capacity && { max_ram_capacity }),
      ...(storage_type && { storage_type }),
      ...(storage_capacity && { storage_capacity }),
      ...(extra_m2_slot && { extra_m2_slot }),
      ...(storage_upgrade && { storage_upgrade }),
      ...(graphics_model && { graphics_model }),
      ...(graphics_memory && { graphics_memory }),
      ...(graphics_type && { graphics_type }),
      ...(keyboard_type && { keyboard_type }),
      ...(touchPad && { touchPad }),
      ...(webcam && { webcam }),
      ...(speaker && { speaker }),
      ...(microphone && { microphone }),
      ...(audio_features && { audio_features }),
      ...(optical_drive && { optical_drive }),
      ...(card_reader && { card_reader }),
      ...(hdmi_port && { hdmi_port }),
      ...(usb_port && { usb_port }),
      ...(usb_type_c && { usb_type_c }),
      ...(microphone_port && { microphone_port }),
      ...(lan && { lan }),
      ...(wifi && { wifi }),
      ...(bluetooth && { bluetooth }),
      ...(fingerPrint && { fingerPrint }),
      ...(camera_privacy_shutter && { camera_privacy_shutter }),
      ...(security_chip && { security_chip }),
      ...(operating_system && { operating_system }),
      ...(battery_capacity && { battery_capacity }),
      ...(adapter_type && { adapter_type }),
      ...(dimensions && { dimensions }),
      ...(weight && { weight }),
      ...(body_material && { body_material }),
      ...(warranty && { warranty }),
      ...(price && { price }),
      ...(sellingPrice && { sellingPrice }),
    };

    // Perform update
    const updatedProduct = await laptopModel.findOneAndUpdate(
      { _id: productId },
      { $set: payload },
      { new: true, upsert: true }
    );

   
    // Send response
    res.status(200).json({
      message: "Laptop updated successfully",
      data: updatedProduct,
      error: false,
      success: true,
    });
  } catch (err) {
    console.error("Error during update operation:", err);
    res.status(500).json({
      message: err?.message || "An error occurred while updating the product.",
      error: true,
      success: false,
    });
  }
}

module.exports = updateLaptopController;
