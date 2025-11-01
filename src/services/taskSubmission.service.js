const TaskSubmission = require("../models/TaskSubmissions");

// create task only employ
const taskVerifyService = async (data) => {
  const task = await TaskSubmission.create(data);
  return task;
};

// get all verified task
const allVerifyTask = async ({ userId, page = 1, limit = 10 }) => {
  const filter = {
    userId,
    isVerified: true,
    isDelete: false,
  };
  const count = await TaskSubmission.countDocuments(filter);
  const totalPages = Math.ceil(count / limit);
  const skip = (page - 1) * limit;
  const tasks = await TaskSubmission.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();

  return {
    data: tasks,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages,
    totalResults: count,
  };
};

// get single task
const singleTask = async (data) => {
  const task = await TaskSubmission.findOne(data);
  return task;
};

// update task
const updateTaskImage = async (taskId, imageUrl) => {
  const updatedTask = await TaskSubmission.findByIdAndUpdate(
    taskId,
    { $
      : { image: {imageUrl} } },
    { new: true, runValidators: true }
  );

  return updatedTask;
};
module.exports = { taskVerifyService, allVerifyTask, singleTask,updateTaskImage };
