const TaskSubmission = require("../models/TaskSubmissions");

// create task only employ
const taskVerifyService = async (data) => {
  const existing = await TaskSubmission.findOne({
    userId: data.userId,
    taskId: data.taskId,
    
  });

  if (existing) {
    throw new Error("You have already claimed this task.");
  }

  const task = await TaskSubmission.create(data);
  return task;
};



// ✅ Get all unclaimed tasks (not claimed by this employ)
const getAllUnclaimedTasks = async (userId, page = 1, limit = 10) => {

  const claimedTask = await TaskSubmission.findOne({ userId: userId });

  if (claimedTask) {
    return { message: 'You have already claimed a task.' };
  }
  const filter = {
    quantity: { $gt: 0 },
  };

  // 🔹 Fetch tasks & count total
  const [tasks, total] = await Promise.all([
    Order.find(filter)
      .populate("serviceId")
      .skip((page - 1) * limit)
      .limit(limit),
    Order.countDocuments(filter),
  ]);

  return {
    data: tasks,
    page: Number(page),
    limit: Number(limit),
    totalResults: total,
    totalPages: Math.ceil(total / limit),
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
module.exports = { taskVerifyService, getAllUnclaimedTasks, singleTask,updateTaskImage };



