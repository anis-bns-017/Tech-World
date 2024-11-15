const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.String,
      ref: "user",
    },
    firstName: String,
    lastName: String,
    company: String,
    address1: String,
    address2: String,
    city: String,
    post_code: Number,
    country: String,
    region: String,
  },
  { timestamps: true }
);

const Address = mongoose.model("address", addressSchema);

module.exports = Address;