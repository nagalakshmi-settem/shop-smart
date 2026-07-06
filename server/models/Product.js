const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name:          { type: String, required: true },
  price:         { type: Number, required: true },
  originalPrice: { type: Number },           // for showing strikethrough price
  category:      { type: String, required: true },
  image:         { type: String, default: "📦" }, // emoji for now, URL later
  rating:        { type: Number, default: 4.0 },
  ratingCount:   { type: Number, default: 0 },
  inStock:       { type: Boolean, default: true },
  description:   { type: String, default: "" },
});

module.exports = mongoose.model("Product", productSchema);