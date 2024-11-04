var bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
const address_Model = require("../../models/address_Model");

async function userSignupController(req, res) {
  try {
    const { firstName, lastName, email, password, phone, otp } = req.body;

    const user = await userModel.findOne({ email });
    console.log("anis", user);
    if (user) {
      throw new Error("Already user exist.");
    }

    if (!firstName) {
      throw new Error("Please provide first name.");
    }

    if (!lastName) {
      throw new Error("Please provide last name.");
    }

    if (!email) {
      throw new Error("Please provide email.");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something is wrong");
    }

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();

    const payload2 = {
      _id: String(userData._id),
      user: String(userData._id)                                                                                                                  , 
      firstName: "",
      lastName: "",
      company: "",
      address1: "",
      address2: "",
      city: "",
      post_code: "",
      country: "",
      region: "",
    };

    const userAddress = new address_Model(payload2);
    const saveAddress = await userAddress.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created successfully!",
    });

    res.status(201).json({
      data: saveAddress,
      success: true,
      error: false,
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
