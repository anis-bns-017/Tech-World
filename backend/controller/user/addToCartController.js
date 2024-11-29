const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
  try {
    console.log("Request Body: ", req.body);
    const { productId, productType } = req.body;
    console.log("BODY ", req.body);
    const currentUser = req.userId; // Assuming this is set by authentication middleware

    // Check if the product is already in the cart for the current user
    const isProductAvailable = await addToCartModel.findOne({
      productId,
      userId: currentUser,
    });

    if (isProductAvailable) {
      return res.json({
        message: "Product already exists in the cart",
        success: false,
        error: true,
      });
    }

    // Create payload for adding to cart
    const payload = {
      productId,
      quantity: 1,
      userId: currentUser,
      productType,
    };

    // Save the new cart entry
    const newAddToCart = new addToCartModel(payload);
    const saveProduct = await newAddToCart.save();

    res.json({
      message: "Product has been added to the cart",
      data: saveProduct,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartController;
