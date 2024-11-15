const uploadProductPermission = require("../../helpers/permission");
const headphoneModel = require("../../models/Category/headphoneModel")

async function headphoneUploadController(req, res) {
  try {
    const sessionUserId = req.userId;
    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("permission denied");
    }

    const uploadProduct = new headphoneModel(req.body);
    const saveProduct = await uploadProduct.save();

    res.status(201).json({
      message: "a headphone uploaded successfully",
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

module.exports = headphoneUploadController;