const userModel = require("../../models/userModel");
const SSLCommerzPayment = require("sslcommerz-lts");
const express = require("express");
const app = express();

const paymentController = async (req, res) => {
  try {
    const { products, total_amount, total_quantity, buyerDetails } = req.body;

    // console.log("hey: ", products);
    // console.log("Buyer: ", buyerDetails);
    // console.log("amount: ", total_amount);
    // console.log("quantity: ", total_quantity);
    const store_id = process.env.STORE_ID;
    const store_passwd = process.env.STORE_PASS;
    const is_live = false;

    const transID = `TRANS_${Date.now()}_${Math.floor(
      Math.random() * 1000000
    )}`;

    const data = {
      total_amount: total_amount,
      currency: buyerDetails.currency,
      tran_id: transID, // use unique tran_id for each api call
      success_url: `http://localhost:8080/api/success/${transID}`,
      fail_url: "http://localhost:3030/fail",
      cancel_url: "http://localhost:3030/cancel",
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "Courier",
      product_name: "Computer.",
      product_category: "Electronic",
      product_profile: "general",
      cus_name: buyerDetails.name,
      cus_email: "customer@example.com",
      cus_add1: buyerDetails.address,
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: buyerDetails.postCode,
      cus_country: "Bangladesh",
      cus_phone: buyerDetails.phoneNumber,
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };

    console.log("My Data: ", data);
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data).then((apiResponse) => {
      // Redirect the user to payment gateway
      let GatewayPageURL = apiResponse.GatewayPageURL;
      res.send({ url: GatewayPageURL });

      const finalOrder = {
        products,
        paidStatus: false,
        tansactionId: transID,
      };

      const result = 
      console.log("Redirecting to: ", GatewayPageURL);
    });
  } catch (err) {
    res.status(400).json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = paymentController;
