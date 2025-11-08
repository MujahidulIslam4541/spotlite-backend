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
    proofImage: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed", "rejected"],
      default: "pending",
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },

    isDelete: {
      type: Boolean,
      default: false,
    },
    earning: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const TaskSubmission = mongoose.model("TaskSubmission", taskSubmissionSchema);
module.exports = TaskSubmission;
