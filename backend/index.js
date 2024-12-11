const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const SSLCommerzPayment = require('sslcommerz-lts')
const cookieParser = require("cookie-parser");
const router = require("./routes");

const store_id = process.env.STORE_ID
const store_passwd = process.env.STORE_PASS
const is_live = false //true for live, false for sandbox


const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

const PORT = 8080

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Connected to DB");
    console.log("Server is running "+PORT);
  });
});
