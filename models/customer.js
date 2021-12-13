const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
    required: true,
  },
  photoUrl: {
    type: String,
  },
  physicalAddress: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: false,
  },
  emailAddress: {
    type: String,
    unique: true,
    required: false,
  },
  coordinates: {
    type: String,
    required: false,
  },
  favoriteCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
  ],
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  }
});

module.exports = Customer = mongoose.model("customer", CustomerSchema);
