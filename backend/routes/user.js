const express = require("express");
const router = express.Router();

const { isSignIn, isAuthenticated } = require("../controllers/auth");
const {
  getUserById,
  getUser,
  updateUser,
  getUserPurchaseList,
  deleteAccount,
  pushOrderInPurchaseList,
} = require("../controllers/user");

const { getCourseById } = require("../controllers/course");

router.param("userId", getUserById);
router.param("courseId", getCourseById);

router.get("/user/:userId", isSignIn, isAuthenticated, getUser);

router.put("/user/:userId", isSignIn, isAuthenticated, updateUser);

/*
router.get(
  "/user/purchases/:userId",
  isSignIn,
  isAuthenticated,
  getUserPurchaseList 
);  // we are not using this till date. 
*/

router.post(
  "/order/push/:courseId/:userId",
  isSignIn,
  isAuthenticated,
  pushOrderInPurchaseList
);

router.get(
  "/user/courses/:userId",
  isSignIn,
  isAuthenticated,
  getUserPurchaseList
);

router.get("/user/delete/:userId", isSignIn, isAuthenticated, deleteAccount);

module.exports = router;
