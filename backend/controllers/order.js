const Order = require("../models/order");
const User = require("../models/user");
const moment = require("moment");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id).exec((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "order not found in DB",
      });
    }
    req.order = order;
    next();
  });
};

//-----------------------------------------------------------------

exports.createOrder = (req, res) => {
  console.log("route hitted");
  console.log(req.body);
  req.body.user = req.profile;
  let order = new Order(req.body);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "failed to create order in DB",
      });
    }
    console.log("order has been successfully created.");
    return res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name lastname email")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "no orders found in DB",
        });
      }
      return res.json(order); // res all orders here
    });
};
