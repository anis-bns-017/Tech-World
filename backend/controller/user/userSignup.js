const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
const address_Model = require("../../models/address_Model");

async function userSignupController(req, res) {
  try {
    const { firstName, lastName, email, password, phone, otp } = req.body;

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists.");
    }

    // Validate required fields
    if (!firstName) throw new Error("Please provide a first name.");
    if (!lastName) throw new Error("Please provide a last name.");
    if (!email) throw new Error("Please provide an email.");
    if (!password) throw new Error("Please provide a password.");

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Password hashing failed.");
    }

    // Create and save the user
    const userPayload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };

    const userData = new userModel(userPayload);
    const saveUser = await userData.save(); // This will include the user's `_id`
    console.log("User saved successfully:", saveUser);

    // Create and save the address for the user
    const addressPayload = {
      user: saveUser._id, // Save reference to the user's ID
      userDetails: saveUser, // Embed full user data directly in the address
      firstName: "", 
      lastName: "", 
      wow: "anis", 
      company: "",
      address1: "",
      address2: "",
      city: "",
      post_code: "",
      country: "",
      region: "",
    };

    const userAddress = new address_Model(addressPayload);
    const saveAddress = await userAddress.save();
    console.log("Address with embedded user data saved successfully:", saveAddress);

    // Send the response
    res.status(201).json({
      user: saveUser,
      address: saveAddress, // Embedded data now stored permanently in MongoDB
      success: true,
      error: false,
      message: "User and address created successfully!",
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignupController;
