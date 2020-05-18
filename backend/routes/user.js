const express = require("express");
const router = express.Router();

const { isSignIn, isAuthenticated } = require("../controllers/auth");
const {
  getUserById,
  getUser,
  updateUser,
  getUserPurchaseList,
  getUserCourses,
  deleteAccount,
} = require("../controllers/user");

router.param("userId", getUserById);

router.get("/user/:userId", isSignIn, isAuthenticated, getUser);

router.put("/user/:userId", isSignIn, isAuthenticated, updateUser);

router.get(
  "/user/purchases/:userId",
  isSignIn,
  isAuthenticated,
  getUserPurchaseList
);

router.get("/user/courses/:userId", isSignIn, isAuthenticated, getUserCourses);

router.get("/user/delete/:userId", isSignIn, isAuthenticated, deleteAccount);

module.exports = router;
