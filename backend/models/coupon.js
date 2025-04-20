const mongoose = require("mongoose");

const couponSchema = mongoose.Schema({
  code: { type: String, required: true, unique: true },
  isPercent: { type: Boolean, required: true, default: true },
  amount: { type: Number, required: true },

  isActive: { type: Boolean, required: true, default: true },
});

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
