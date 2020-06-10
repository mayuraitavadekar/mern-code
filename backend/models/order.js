const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },

    course: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    razorpay_payment_id: {
      type: String,
      required: true,
    },

    razorpay_order_id: {
      type: String,
      required: true,
    },

    razorpay_signature: {
      type: String,
      required: true,
    },

    payment_status: {
      type: String,
      required: true,
      default: "not verified", // { verified, not verified }
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
