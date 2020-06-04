const shortid = require("shortid");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

exports.createPaymentOrder = (req, res) => {
  const options = {
    amount: req.body.price * 100,
    currency: "INR",
    receipt: shortid.generate(),
    payment_capture: "1",
  };

  razorpay.orders.create(options, function (err, order) {
    if (err) {
      return res.status(400).json({
        error: "error in creating order",
        message: err,
      });
    }
    return res.json(order);
  });
};

exports.verifyPaymentByWebhook = (req, res) => {
  //console.log(req.body);
  let shasum = crypto.createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET);
  shasum.update(JSON.stringify(req.body));
  let digest = shasum.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("payment successfully captured! verified!");
  }

  return res.json({
    status: "ok",
  });
};

exports.verifyPayment = (req, res) => {
  console.log(req.body);
  const razorpay_order_id = req.body.razorpay_order_id;
  const razorpay_payment_id = req.body.razorpay_payment_id;
  const razorpay_signature = req.body.razorpay_signature;

  const generate_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  console.log("generate signature : ", generate_signature);
  console.log("razorpay signature", razorpay_signature);

  if (generate_signature === razorpay_signature) {
    return res.status(200).json({
      status: "ok",
    });
  } else {
    return res.status(400).json({
      error: "error in payment verification.",
    });
  }
};
