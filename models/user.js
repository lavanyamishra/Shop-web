const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
    email: String,
    token: String,
    password: String,
    profile: {
      type: String,
      default: "no",
    },
    isProfileComplete: {
      type: Boolean,
      default: false,
    },
    userType: {
      type: String,
      default: "user",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    mobile: String,
    address: [
      {
        near: String,
        city: String,
        country: String,
        state: String,
        pincode: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
