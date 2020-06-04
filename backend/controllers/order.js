const Order = require("../models/order");

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
  req.body.user = req.profile;
  let order = new Order(req.body);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "failed to create order in DB",
      });
    }
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
