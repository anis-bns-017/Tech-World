const uploadProductPermission = require("../../helpers/permission");
const phoneModel = require("../../models/Category/phoneModel")

async function phoneUploadController(req, res) {
  try {
    const sessionUserId = req.userId;
    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("permission denied");
    }

    const uploadProduct = new phoneModel(req.body);
    const saveProduct = await uploadProduct.save();

    res.status(201).json({
      message: "a phone uploaded successfully",
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
