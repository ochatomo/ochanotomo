/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var express = require("express");
var bodyParser = require("body-parser");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51JDipHEb3m5UkCpeRhMqqpAAlSoqSYE28ozLbE9gFITmxdzfeAGS5ydZdc0U4IvUazsZWWEuAy4ADjqtPUr2KQPI00zs0hN67v",
  { apiVersion: "2020-08-27" }
);

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/**********************
 * Example get method *
 **********************/

app.post("/create-payment-intent", async function (req, res) {
  // Add your code here
  console.log("request received");
  // req.body にpriceを含める
  const { price } = req.body;
  console.log("price---", price);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price, //lowest denomination of particular currency
      currency: "jpy",
      payment_method_types: ["card"], //by default
    });

    console.log({ paymentIntent });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});

app.get("/create-payment-intent/", function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});
// app.get("/create-payment-intent/", function (req, res) {
//   // Add your code here
//   res.json({
//     isBase64Encoded: false,
//     statusCode: 200,
//     body: "Hello from Lambda!",
//     headers: {
//       "content-type": "application/json",
//     },
//   });
// });

/****************************
 * Example post method *
 ****************************/

// app.post("/create-payment-intent/*", function (req, res) {
//   // Add your code here
//   res.json({ success: "post call succeed!", url: req.url, body: req.body });
// });

/****************************
 * Example put method *
 ****************************/

app.put("/create-payment-intent", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/create-payment-intent/*", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete("/create-payment-intent", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.delete("/create-payment-intent/*", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
