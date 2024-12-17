const mongoose = require("mongoose");
const uploadProductPermission = require("../../helpers/permission");
const phoneModel = require("../../models/Category/phoneModel");

async function updatePhoneController(req, res) {
  try {
    const {
      productName,
      brandName,
      category,
      productImage,
      key_features,
      description,
      display_size,
      display_type,
      screen_resolution,
      refresh_rate,
      protection,
      display_features,
      chipset,
      cpu_type,
      cpu_speed,
      gpu,
      ram,
      internal_storage,
      card_slot,
      rear_camera_resolution,
      rear_camera_features,
      rear_video_recording,
      front_camera_resolution,
      front_video_recording,
      speaker,
      sim,
      network,
      wifi,
      bluetooth,
      gps,
      usb,
      audio_jack,
      opearating_system,
      finger_print,
      sensor,
      battery,
      dimension,
      color,
      price,
      sellingPrice,
      warranty,
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

    // Extract data
    const { productId, ...updateData } = req.body;

    // Validate `productId`
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      console.error("Invalid Product ID:", productId);
      return res.status(400).json({
        message: "Invalid Product ID",
        error: true,
        success: false,
      });
    }

    // Check if the product exists
    const existingProduct = await phoneModel.findById(productId);
    console.log("Existing Product:", existingProduct);

    if (!existingProduct) {
      console.error("Product not found for ID:", productId);
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    const payload = {
      ...(productName && { productName }),
      ...(brandName && { brandName }),
      ...(category && { category }),
      ...(productImage?.length && { productImage }),
      ...(key_features && { key_features }),
      ...(description && { description }),
      ...(display_size && { display_size }),
      ...(display_type && { display_type }),
      ...(screen_resolution && { screen_resolution }),
      ...(refresh_rate && { refresh_rate }),
      ...(protection && { protection }),
      ...(display_features && { display_features }),
      ...(chipset && { chipset }),
      ...(cpu_type && { cpu_type }),
      ...(cpu_speed && { cpu_speed }),
      ...(gpu && { gpu }),
      ...(ram && { ram }),
      ...(internal_storage && { internal_storage }),
      ...(card_slot && { card_slot }),
      ...(rear_camera_resolution && { rear_camera_resolution }),
      ...(rear_camera_features && { rear_camera_features }),
      ...(rear_video_recording && { rear_video_recording }),
      ...(front_camera_resolution && { front_camera_resolution }),
      ...(front_video_recording && { front_video_recording }),
      ...(speaker && { speaker }),
      ...(sim && { sim }),
      ...(network && { network }),
      ...(wifi && { wifi }),
      ...(bluetooth && { bluetooth }),
      ...(gps && { gps }),
      ...(usb && { usb }),
      ...(audio_jack && { audio_jack }),
      ...(opearating_system && { opearating_system }),
      ...(finger_print && { finger_print }),
      ...(sensor && { sensor }),
      ...(battery && { battery }),
      ...(dimension && { dimension }),
      ...(color && { color }),
      ...(price && { price }),
      ...(sellingPrice && { sellingPrice }),
      ...(warranty && { warranty }),
    };

    // Perform update
    const updatedProduct = await phoneModel.findOneAndUpdate(
      { _id: req.body.productId }, // Ensure `productId` is provided in `req.body`
      { $set: payload },
      { new: true, upsert: true }
    );

    console.log("wow Product:", updatedProduct);

    // Send response
    res.status(200).json({
      message: "Phone updated successfully",
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

module.exports = updatePhoneController;
