const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  photos: [
    {
      photoUrl: {
        type: String
      }
    }
  ]
});

module.exports = Product = mongoose.model("product", ProductSchema);
