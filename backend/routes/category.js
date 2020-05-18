const express = require("express");
const router = express.Router();

// importing some controllers
const { isSignIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
  getCategoryById,
  createCategory,
  getAllCategories,
  deleteCategory,
  getCategory,
  updateCategory,
} = require("../controllers/category");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// create
router.post(
  "/category/create/:userId",
  isSignIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

// read
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategories);

// upate
router.put(
  "/category/:categoryId/:userId",
  isSignIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

// delete
router.delete(
  "/category/:categoryId/:userId",
  isSignIn,
  isAuthenticated,
  isAdmin,
  deleteCategory
);

module.exports = router;
