
var bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");

async function userSignupController(req, res) {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      throw new Error("Already user exist.");
    }

    if (!name) {
      throw new Error("Please provide name.");
    }

    if (!email) {
      throw new Error("Please provide email.");
    }

    if (!password) {
      throw new Error("Please provide password.");
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

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created successfully!",
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
