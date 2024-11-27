const phoneModel = require("../../models/Category/phoneModel");

const getMobile = async (req, res) => {
  try {
    const allMobiles = await phoneModel.find().sort({ createdAt: -1 });
    res.json({
      message: "All products",
      error: false,
      success: true,
      data: allMobiles,
    });
  } catch (err) {
    res.status(400).json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getMobile;
