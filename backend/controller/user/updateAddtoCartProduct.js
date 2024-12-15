const addToCartModel = require("../../models/cartProduct");

const updateAddtoCartProduct = async (req, res) => {
  try {
    const addToCartProductId = req?.body?._id;

    // console.log("product Id: ", addToCartProductId);
    const qty = req.body.quantity;

    const updateProduct = await addToCartModel.updateOne({_id: addToCartProductId}, {
      ...(qty && { quantity: qty}),
    });

    res.json({
      message: "product updated",
      data: updateProduct,
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = updateAddtoCartProduct;
