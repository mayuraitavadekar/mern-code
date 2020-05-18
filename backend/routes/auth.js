const express = require("express");
const router = require("express").Router();
const { check } = require("express-validator");

// calling some controllers for hitting the routes
const { signin, signout, signup } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("email").isEmail(),
    check("password", "password must be atlest 3 characters").isLength({
      min: 3,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email").isEmail(),
    check("password", "password must be atlest 3 characters").isLength({
      min: 3,
    }),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
