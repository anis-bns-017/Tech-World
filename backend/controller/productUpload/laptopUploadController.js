const uploadProductPermission = require("../../helpers/permission");
const laptopModel = require("../../models/Category/laptopModel")

async function laptopUploadController(req, res) {
  try {
    const sessionUserId = req.userId;
    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("permission denied");
    }

    const uploadProduct = new laptopModel(req.body);
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