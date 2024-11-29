const uploadProductPermission = require("../../helpers/permission");
const phoneModel = require("../../models/Category/phoneModel");

async function phoneUploadController(req, res) {
  try {
    const sessionUserId = req.userId; // Retrieve the user ID from the request
    console.log("session ID: ", sessionUserId);

    // Check if the user has the required permission
    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }

    // Add the userId to the payload
    const productData = {
      ...req.body,      // Spread the existing product data
      userId: sessionUserId, // Add the user ID
    };

    // Create a new product with the updated payload
    const uploadProduct = new phoneModel(productData);
    const saveProduct = await uploadProduct.save();

    res.status(201).json({
      message: "A phone uploaded successfully",
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

module.exports = phoneUploadController;
