const uploadProductPermission = require("../../helpers/permission");
const monitorModel = require("../../models/Category/monitorModel")

async function monitorUploadController(req, res) {
  try {
    const sessionUserId = req.userId;
    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("permission denied");
    }

    const productData = {
      ...req.body,      // Spread the existing product data
      userId: sessionUserId, // Add the user ID
    };

    const uploadProduct = new monitorModel(productData);
    const saveProduct = await uploadProduct.save();

    res.status(201).json({
      message: "a monitor uploaded successfully",
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

module.exports = monitorUploadController;
