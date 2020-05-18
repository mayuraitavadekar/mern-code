const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/user");
const { isSignIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
  getCourseById,
  createCourse,
  getCourse,
  getPhoto,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getAllUniqueCategories,
} = require("../controllers/course.js");

router.param("userId", getUserById);
router.param("courseId", getCourseById);

// create
router.post(
  "/course/create/:userId",
  isSignIn,
  isAuthenticated,
  isAdmin,
  createCourse
);

// read
router.get("/course/:courseId", getCourse);
router.get("/course/photo/:courseId", getPhoto);
router.get("/courses/categories", getAllUniqueCategories);

// update
router.put(
  "/course/:courseId/:userId",
  isSignIn,
  isAuthenticated,
  isAdmin,
  updateCourse
);

// delete
router.delete(
  "/course/:courseId/:userId",
  isSignIn,
  isAuthenticated,
  isAdmin,
  deleteCourse
);

router.get("/courses", getAllCourses);

module.exports = router;
