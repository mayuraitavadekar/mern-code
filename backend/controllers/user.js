// calling model
const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");
const jwt_decode = require("jwt-decode");

exports.signup = (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    // errors are present
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  // errors is empty; can signup
  let user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "not able to save in DB",
      });
    }
    res.json({
      name: user.name,
      lastname: user.lastname,
      id: user._id,
      email: user.email,
    });
  });
};

exports.signin = (req, res) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    // errors are present in signin data
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  // validation of email and password is successfull
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      res.status(404).json({
        error: "email is not available in DB",
      });
    }

    // email is found!
    if (!user.authenticate(password)) {
      res.status(401).json({
        error: "password doesn't match",
      });
    }

    // email and password matched. // sign in
    // create token
    let token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // put token into user cookie
    res.cookie("token", token, { expire: new Date() + 60 * 60 });

    const { _id, name, email, role } = user; // destrucuring

    return res.json({
      token,
      user: { _id, name, email, role },
      cookiesetted: req.cookies["token"],
      //decodedcookietoken: jwt_decode(req.cookies["token"]), run for every new token
    });
  });
};

exports.signout = (req, res) => {
  // simply clear the cookies
  res.clearCookie("token");
  res.json({
    message: "user signout successfully",
  });
};
