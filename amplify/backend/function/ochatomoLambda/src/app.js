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
const stripe = Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2020-08-27" });

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
app.post("/payment/create-subscription", async (req, res) => {
  const { email, payment_method } = req.body;

  const customer = await stripe.customers.create({
    payment_method: payment_method,
    email: email,
    invoice_settings: {
      default_payment_method: payment_method,
    },
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: process.env.PRICE_ID }],
    expand: ["latest_invoice.payment_intent"],
  });

  const subscription_id = subscription.id;
  const status = subscription["latest_invoice"]["payment_intent"]["status"];
  const client_secret = subscription["latest_invoice"]["payment_intent"]["client_secret"];
  const invoiceUrl = subscription["latest_invoice"]["hosted_invoice_url"];

  res.json({ client_secret, status, subscription_id, invoiceUrl });
});

app.post("/payment/cancel-subscription", async function (req, res) {
  const { subscriptionID } = req.body;
  const deletedSubscription = await stripe.subscriptions.del(subscriptionID);
  const status = deletedSubscription.status;
  const current_period_end = deletedSubscription["current_period_end"];
  res.send({ status, current_period_end });
});

app.post("/payment/create-payment-intent", async function (req, res) {
  const { price } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price,
      currency: "jpy",
      payment_method_types: ["card"],
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    res.json({ error: e.message });
  }
});

app.get("/payment/pk", function (req, res) {
  res.json({
    pk: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
