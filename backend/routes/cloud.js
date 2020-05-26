const express = require("express");
const router = express.Router();

const { isSignIn, isAuthenticated, isAdmin } = require("../controllers/auth");

const { getCourseDataFromCloud } = require("../controllers/cloud");

const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);

router.post(
  "/getCourseDataFromCloud/:userId",
  isSignIn,
  isAuthenticated,
  isAdmin,
  getCourseDataFromCloud
);

module.exports = router;
