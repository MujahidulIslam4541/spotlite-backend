const mongoose = require("mongoose");

const taskSubmissionSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    verification: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      number: { type: String, required: true },
      location: { type: String, required: true },
    },
    proofImage: {
      type: String, 
    },
    status: {
      type: String,
      enum: ["pending", "verified", "completed", "rejected"],
      default: "pending",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },

    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const TaskSubmission=mongoose.model("TaskSubmission", taskSubmissionSchema);
module.exports = TaskSubmission;
