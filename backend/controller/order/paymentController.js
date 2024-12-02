const userModel = require("../../models/userModel");
const stripe = require("stripe")(
  "sk_test_51QR5zPA8YvS28rwrn92tpS9LZV2ZjnUX4jurJwstpVuz4pPEytivnVpztpnb7WHWoTUvZNhO40DKaX74Lj7VaRXH00ouK8b82D"
);

const paymentController = async (req, res) => {
  try {
    const { products } = req.body;

    console.log("hey: ", products);

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "bdt",
        product_data: {
          name: product.productId.productName,
          images: product.productId.productImage, // Ensure these are valid URLs
          metadata: {
            productId: product.productId._id,
          },
        },
        unit_amount: product.productId.sellingPrice * 100,
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });
    console.log("hey ", session?.id);

    res.json({ id: session?.id });
  } catch (err) {
    res.status(400).json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = paymentController;
