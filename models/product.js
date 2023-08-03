const mongoose = require("mongoose");

const product_schema = new mongoose.Schema({
  name: { type: String, required: [true, "product name must be provided"] },
  price: { type: Number, required: [true, "product price must be provided"] },
  featured: { type: Boolean, default: false },
  rating: { type: Number, default: 4.5, max: 5 },
  createdAt: { type: Date, default: Date.now() },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    },
  },
});

const user_model = mongoose.model("product", product_schema);

module.exports = user_model;
