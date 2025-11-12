const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employId: {
      type:[mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: false,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    orderName: {
      type: String,
      required: true,
      trim: true,
    },
    isDelete: {
      type: Boolean,
      default:false
    },

    quantity: {
      type: Number,
      default: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    addLink: {
      type: String,
      required: true,
      trim: true,
    },
    addComment: {
      type: String,
      required: true,
      trim: true,
      maxLength: [200, "Comment can't exceed 200 characters"],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
