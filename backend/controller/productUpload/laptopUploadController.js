const uploadProductPermission = require("../../helpers/permission");
const laptopModel = require("../../models/Category/laptopModel")

async function laptopUploadController(req, res) {
  try {
    const sessionUserId = req.userId;
    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("permission denied");
    }

    const productData = {
      ...req.body,      // Spread the existing product data
      userId: sessionUserId, // Add the user ID
    };

    const uploadProduct = new laptopModel(productData);
    const saveProduct = await uploadProduct.save();

    res.status(201).json({
      message: "a laptop uploaded successfully",
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

module.exports = laptopUploadController;
