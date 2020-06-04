const express = require("express");
const router = express.Router();

const {
  createPaymentOrder,
  verifyPaymentByWebhook,
  verifyPayment,
} = require("../controllers/payment");
const { isSignIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);

router.post(
  "/payment/create/order/:userId",
  isSignIn,
  isAuthenticated,
  createPaymentOrder
);

router.post("/payment/verify/webhook", verifyPaymentByWebhook);

router.post(
  "/payment/verify/:userId",
  isSignIn,
  isAuthenticated,
  verifyPayment
);

module.exports = router;

/* 
    - verifyTransaction: verifies after the payment is captured/amount is decucted from the bank account
*/
