const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
  user:    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  rating:  { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true }
}, { timestamps: true });

reviewSchema.index({ product: 1 });
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);