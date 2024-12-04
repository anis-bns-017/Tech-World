const bcrypt = require("bcryptjs");
const address_Model = require("../../models/address_Model");
const userModel = require("../../models/userModel");

async function userSignupController(req, res) {
  try {
    const {
      firstName,
      company,
      lastName,
      address1,
      address2,
      post_code,
      country,
      region,
      city,
    } = req.body;

    console.log("address: ", req.body);

    // Find the user by ID
    const user = await userModel.findById(req.userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    // Prepare the update payload
    const payload = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(address1 && { address1 }),
      ...(address2 && { address2 }),
      ...(post_code && { post_code }),
      ...(country && { country }),
      ...(region && { region }),
      ...(city && { city }),
      ...(company && { company }),
    };

    // Update the existing address or create one if it doesn't exist
    const updatedAddress = await address_Model.findOneAndUpdate(
      { user: user._id }, // Find the address by the `user` field
      { $set: payload }, // Update with the new data
      { new: true, upsert: true } // `upsert: true` creates a new document if none is found
    );

    console.log("Updated Address:", updatedAddress);

    // Send the response
    res.status(200).json({
      data: updatedAddress,
      success: true,
      error: false,
      message: "User address updated successfully!",
    });
  } catch (err) {
    console.error("Error updating address:", err); // Log the error details
    res.status(500).json({
      message: err?.message || "An error occurred while updating the address.",
      error: true,
      success: false,
    });
  }
}

module.exports = userSignupController;
