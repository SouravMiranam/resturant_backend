const mongoose = require("mongoose");
const orderschema = new mongoose.Schema(
  {
    foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "foods" }],
    payment: {},
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    status: {
      type: String,
      enum: ["preparing", "prepared", "on the way", "delivered"],
      default: "preparing",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", orderschema);
