const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fistName: String,
    lastName: String, 
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    phone: Number,
    otp: Number,
    role: String,
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
