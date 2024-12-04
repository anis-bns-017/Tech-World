const mongoose = require("mongoose");
const uploadProductPermission = require("../../helpers/permission");
const tabletModel = require("../../models/Category/tabletModel");

async function updateTabletController(req, res) {
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
      display_resolution,
      processor,
      ram,
      storage,
      connectivity,
      operating_system,
      audio,
      dimension,
      weight,
      sim,
      color,
      rear_camera,
      front_camera,
      battery_type,
      battery_capacity,
      bluetooth,
      GPS,
      sensor,
      usb,
      wlan,
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
    const existingProduct = await tabletModel.findById(productId);
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
      ...(display_resolution && { display_resolution }),
      ...(processor && { processor }),
      ...(ram && { ram }),
      ...(storage && { storage }),
      ...(connectivity && { connectivity }),
      ...(operating_system && { operating_system }),
      ...(audio && { audio }),
      ...(dimension && { dimension }),
      ...(weight && { weight }),
      ...(sim && { sim }),
      ...(color && { color }),
      ...(rear_camera && { rear_camera }),
      ...(front_camera && { front_camera }),
      ...(battery_type && { battery_type }),
      ...(battery_capacity && { battery_capacity }),
      ...(bluetooth && { bluetooth }),
      ...(GPS && { GPS }),
      ...(sensor && { sensor }),
      ...(usb && { usb }),
      ...(wlan && { wlan }),
      ...(price && { price }),
      ...(sellingPrice && { sellingPrice }),
      ...(warranty && { warranty }),
    };

    // Perform update
    const updatedProduct = await tabletModel.findOneAndUpdate(
      { _id: req.body.productId }, // Ensure `productId` is provided in `req.body`
      { $set: payload },
      { new: true, upsert: true }
    );

    console.log("wow Product:", updatedProduct);

    // Send response
    res.status(200).json({
      message: "Product updated successfully",
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

module.exports = updateTabletController;
