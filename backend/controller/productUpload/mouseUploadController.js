const uploadProductPermission = require("../../helpers/permission");
const mouseModel = require("../../models/Category/mouseModel")

async function mouseUploadController(req, res) {
  try {
    const sessionUserId = req.userId;
    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("permission denied");
    }

    const productData = {
      ...req.body,      // Spread the existing product data
      userId: sessionUserId, // Add the user ID
    };

    const uploadProduct = new mouseModel(productData);
    const saveProduct = await uploadProduct.save();

    res.status(201).json({
      message: "a mouse uploaded successfully",
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

module.exports = mouseUploadController;
