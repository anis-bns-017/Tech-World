const SSLCommerzPayment = require("sslcommerz-lts");
const orderProductModel = require("../../models/Category/orderProductModel");
const { v4: uuidv4 } = require("uuid");
// const express = require("express");
// const app = express();

const paymentController = async (req, res) => {
  try {
    const sessionUserId = req.userId;
    const { OrderData, products, total_amount, total_quantity } = req.body;
    //console.log("asfas: ", req.body);

    console.log("hey: ", products);
    console.log("Buyer: ", OrderData);
    console.log("amount: ", total_amount);
    console.log("quantity: ", total_quantity);

    const {
      customar_firstName,
      customar_address,
      customar_city,
      customar_postCode,
      customar_phone,
      customar_region,
      customar_email,
      customar_lastName,
      customar_country,
      payment_method,
      delivery_method,
    } = req.body.OrderData;

    const store_id = process.env.STORE_ID;
    const store_passwd = process.env.STORE_PASS;
    const is_live = false;

    const transID = `TRANS_${uuidv4()}`;

    const data = {
      total_amount: total_amount,
      currency: "BDT",
      tran_id: transID, // use unique tran_id for each api call
      success_url: `http://localhost:8080/api/payment-success/${transID}`,
      fail_url: `http://localhost:8080/api/payment-fail/${transID}`,
      cancel_url: "http://localhost:3030/cancel",
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "Courier",
      product_name: "Computer.",
      product_category: "Electronic",
      product_profile: "general",
      cus_name: customar_firstName + " " + customar_lastName,
      cus_email: customar_email,
      cus_add1: customar_address,
      cus_add2: "Dhaka",
      cus_city: customar_city,
      cus_state: customar_region,
      cus_postcode: customar_postCode,
      cus_country: customar_country,
      cus_phone: customar_phone,
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data).then(async (apiResponse) => {
      // Redirect the user to payment gateway
      let GatewayPageURL = apiResponse.GatewayPageURL;
      res.send({ url: GatewayPageURL });

      const payload = {
        userId: sessionUserId, 
        customar_firstName,
        customar_address,
        customar_city,
        customar_postCode,
        customar_phone,
        customar_region,
        customar_email,
        customar_lastName,
        customar_country,
        payment_status: false,
        totalAmount: total_amount,
        totalQuantity: total_quantity,
        transactionId: transID,
        delivery_method: delivery_method,
        payment_method: payment_method,
      };

      const uploadProduct = new orderProductModel(payload);
      const saveProduct = await uploadProduct.save();

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
