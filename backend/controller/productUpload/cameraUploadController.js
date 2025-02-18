const uploadProductPermission = require("../../helpers/permission");
const cameraModel = require("../../models/Category/cameraModel")

async function cameraUploadController(req, res) {
  try {
    
    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("permission denied");
    }

    const productData = {
      ...req.body,      // Spread the existing product data
      userId: sessionUserId, // Add the user ID
    };

    const uploadProduct = new cameraModel(productData);
    const saveProduct = await uploadProduct.save();

    res.status(201).json({
      message: "a camera uploaded successfully",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = cameraUploadController;
