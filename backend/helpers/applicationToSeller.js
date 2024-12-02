const sendEmail = require("../utils/sendEmail");
const userModel = require("../models/userModel");
const productModel = require("../models/productModel");

const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
 
    const user = await userModel.findById(req.userId);
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

   
    user.cart.push({ productId });
    await user.save();

    
    const sellerEmail = product.sellerEmail;  
    await sendEmail({
      to: sellerEmail,
      subject: "New Product Order",
      text: `Someone has added your product (${product.productName}) to their cart.`,
      html: `<p>Someone has added your product (<strong>${product.productName}</strong>) to their cart.</p>`,
    });

    res.json({ success: true, message: "Product added to cart and seller notified" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

module.exports = addToCart;
