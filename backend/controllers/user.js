const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(404).json({
        error: "user not found in DB",
      });
    }

    // user found
    req.profile = user; // user added in profile properties
    next();
  });
};

//-----------------------------------------------------------------------------

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "error in update user.",
        });
      }

      user.salt = undefined;
      user.encry_password = undefined;

      return res.json(user);
    }
  );
};

exports.getUserPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name email purchases")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "no orders of this user in account",
        });
      }
      return res.json(orders);
    });
};

exports.getUserCourses = (req, res) => {
  return res.json(req.profile.purchases);
};

exports.deleteAccount = (req, res) => {
  User.findByIdAndDelete(req.profile._id).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "error in deleting account",
      });
    }
    return res.json({
      message: "your account is delete successfully",
      accountData: user,
    });
  });
};

// middleware
exports.pushOrderInPurchaseList = (req, res, next) => {
  // once user purchase the course we need to push it into purchases in user model

  let purchase = {
    _id: req.body.course_id,
    name: req.body.course_name,
    courseurl: req.body.courseurl,
    category: req.body.course_category,
    amount: req.body.amount,
    transaction_id: req.body.transaction_id,
  };

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "unable to push item in purchase list",
        });
      }
      next();
    }
  );
};
