const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    course: {
      type: String,
    },

    courseurl: {
      type: String,
    },

    transaction_id: {
      type: String,
    },

    amount: {
      type: Number,
    },

    address: {
      type: String,
    },

    status: {
      type: String,
      default: "Not Received", // { received, processing, not received }
    },

    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
