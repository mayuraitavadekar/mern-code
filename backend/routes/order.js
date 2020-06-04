const express = require("express");
const router = express.Router();

const { isSignIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
  getOrderById,
  createOrder,
  getAllOrders,
} = require("../controllers/order");

// param
router.param("orderId", getOrderById);
router.param("userId", getUserById);

// create
router.post("/order/create/:userId", isSignIn, isAuthenticated, createOrder);

router.get(
  "/orders/all/:userId",
  isSignIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

module.exports = router;
