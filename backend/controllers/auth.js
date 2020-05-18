// calling model
const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");
// const jwt_decode = require("jwt-decode");

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
      return res.status(404).json({
        error: "email is not available in DB",
      });
    }

    // email is found!
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "password doesn't match",
      });
    }

    // email and password matched. // sign in
    // create token
    let token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token into user cookie
    res.cookie("token", token, {
      path: "/",
      expire: new Date(Date.now() + 60 * 60 * 24 * 1000 * 1),
    });

    const { _id, name, lastname, email, role } = user; // destrucuring

    return res.json({
      token,
      user: { _id, name, lastname, email, role },
      cookiesetted: req.cookies["token"],
      //decodedcookietoken: jwt_decode(req.cookies["token"]), run for every new token
    });
  });
};

exports.signout = (req, res) => {
  // simply clear the cookies
  res.clearCookie("token");
  return res.json({
    message: "user signout successfully",
  });
};

//-------------------------------------------------------------------------------

exports.isSignIn = expressjwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.json(403).json({
      error: "not authenticated. access denied.",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "not admin. access denied.",
    });
  }
  next();
};
