const addToCartModel = require("../../models/cartProduct");

const deleleAddToCartProduct = async (req, res) => {
  try {
    const productId = req.body._id;

    const deleteProduct = await addToCartModel.deleteOne({ _id: productId });
    res.json({
      message: "Product Deleted from Cart",
      error: false,
      success: true,
      data: deleteProduct,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = deleleAddToCartProduct;
