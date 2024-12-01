const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Backend stripe library
const userModel = require("../../models/userModel");

const paymentController = async (req, res) => {
  try {
    const { cartItems } = req.body;

    console.log("wow cart: ", cartItems);

    const user = await userModel.findOne({ _id: req.userId });

    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto", // Changed from "hide" to "auto"
      shipping_options: [
        {
          shipping_rate: "shr_1QREXAA8YvS28rwrFYXAZgu6",
        },
      ],
      customer_email: user.email,
      line_items: cartItems.map((item) => {
        return {
          price_data: {
            currency: "bdt",
            product_data: {
              name: item.productId.productName,
              images: item.productId.productImage, // Ensure these are valid URLs
              metadata: {
                productId: item.productId._id,
              },
            },
            unit_amount: item.productId.sellingPrice * 100, // Convert to cents
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create(params);

    // Send the session ID to the frontend
    res.status(200).json({session});
  } catch (err) {
    console.error("Stripe Error: ", err.message); // Log the error for debugging
    res.status(400).json({
      message: err?.message || "An error occurred",
      error: true,
      success: false,
    });
  }
};

module.exports = paymentController;
