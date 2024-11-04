const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    otp: Number,
    role: String,
  },
  { timestamps: true }
);

// const addressSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "user", // Reference to the User model
//       required: true,
//     },
//     firstName: String,
//     lastName: String,
//     email: {
//       type: String,
//       required: true,
//     },
//     company: String,
//     address1: String,
//     address2: String,
//     city: String,
//     post_code: Number,
//     country: String,
//     region: String,
//   },
//   { timestamps: true }
// );

const User = mongoose.model("user", userSchema);
// const Address = mongoose.model("address", addressSchema);

module.exports = User;
