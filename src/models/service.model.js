const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true, 
      trim: true,
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    pricePerUnit: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

serviceSchema.index({ name: 1, subCategoryId: 1 }, { unique: true });
const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
