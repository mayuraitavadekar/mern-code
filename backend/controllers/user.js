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

/*
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
}; // we are not using this till date
*/

exports.getUserPurchaseList = (req, res) => {
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

exports.pushOrderInPurchaseList = (req, res) => {
  console.log("pushOrderInPurchaseList has been hit");

  // once user purchase the course we need to push it into purchases in user model
  let currentDate = new Date();
  let expirationDate = new Date(
    currentDate.setMonth(currentDate.getMonth() + 3)
  );

  let purchase = {
    course: req.course._id, // params middleware
    name: req.body.name,
    category: req.body.category,
    amount: req.body.price,
    expiration_date: expirationDate,
    payment_id: req.body.payment_id,
  };

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchase } },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "unable to push item in purchase list",
        });
      }
      console.log("order has been pushed successfully.", user);
    }
  );
};
