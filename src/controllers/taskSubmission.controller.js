const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");
const Order = require("../models/order.model");
const { taskVerifyService, allVerifyTask, singleTask, updateTaskImage, getAllUnclaimedTasks } = require("../services/taskSubmission.service");
const TaskSubmission = require("../models/TaskSubmissions");


// create task only employ
const taskVerifyController = catchAsync(async (req, res) => {
  const { taskId } = req.body;
  const userId = req.user.id;

  if (req.user.role !== "employ") {
    return res.status(httpStatus.UNAUTHORIZED).json(
      response({
        message: "Access denied: only employ can perform this action",
        status: "FAIL",
        statusCode: httpStatus.UNAUTHORIZED,
      })
    );
  }

  const order = await Order.findById(taskId).populate("serviceId");
  if (!order) {
    return res.status(httpStatus.NOT_FOUND).json(
      response({
        message: "Order not found",
        status: "FAIL",
        statusCode: httpStatus.NOT_FOUND,
      })
    );
  }

  if (order.quantity <= 0) {
    return res.status(httpStatus.BAD_REQUEST).json(
      response({
        message: "Order quantity is 0 — cannot claim this order.",
        status: "FAIL",
        statusCode: httpStatus.BAD_REQUEST,
      })
    );
  }

  const perServicePrice = order?.serviceId?.pricePerUnit || 0;
  const employEarning = perServicePrice * 0.5;

  const verifyData = {
    userId,
    taskId,
    status: "in-progress",
    isCompleted: false,
    earning: employEarning,
  };

  const result = await taskVerifyService(verifyData);

  order.quantity = order.quantity - 1;
  await order.save();

  res.status(httpStatus.OK).json(
    response({
      message: "Task claimed successfully & order quantity updated.",
      status: "OK",
      statusCode: httpStatus.OK,
      data: {
        taskSubmission: result,
        remainingQuantity: order.quantity,
      },
    })
  );
});

// ✅ Get all unclaimed tasks for employ
const allTask = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  if (!userId) {
    return res.status(httpStatus.UNAUTHORIZED).json(
      response({
        message: "Access denied: You are not a valid employ",
        status: "FAIL",
        statusCode: httpStatus.UNAUTHORIZED,
      })
    );
  }

  const result = await getAllUnclaimedTasks(userId, page, limit);

  res.status(httpStatus.OK).json(
    response({
      message: "Unclaimed tasks fetched successfully",
      status: "OK",
      statusCode: httpStatus.OK,
      data: result,
    })
  );
});


// const allVerifyTask = catchAsync(async (req, res) => {
//   const userId = req.user.id;
//   const page = Number(req.query.page) || 1;
//   const limit = Number(req.query.limit) || 10;

//   if (!userId) {
//     return res.status(httpStatus.UNAUTHORIZED).json(
//       response({
//         message: "Access denied: You are not a valid employ",
//         status: "FAIL",
//         statusCode: httpStatus.UNAUTHORIZED,
//       })
//     );
//   }

//   const result = await getAllVerifiedTasks(userId, page, limit);

//   res.status(httpStatus.OK).json(
//     response({
//       message: "Verified tasks fetched successfully",
//       status: "OK",
//       statusCode: httpStatus.OK,
//       data: result,
//     })
//   );
// });









// single task get is verified
const task = catchAsync(async (req, res) => {
  const taskId = req.params.id;

  const taskData = await TaskSubmission.findById(taskId);
  if (!taskData) {
    return res.status(httpStatus.NOT_FOUND).json(
      response({
        message: "Access denied: this is not valid taskId",
        status: "FAIL",
        statusCode: httpStatus.NOT_FOUND,
      })
    );
  }

  const result = await singleTask(taskData);

  res.status(httpStatus.OK).json(
    response({
      message: " task fetched successfully",
      status: "OK",
      statusCode: httpStatus.OK,
      data: result,
    })
  );
});

const taskUpdate = catchAsync(async (req, res) => {
  const taskId = req.params.id;
  const { image } = req.body;

  const taskData = await TaskSubmission.findById(taskId);
  if (!taskData) {
    return res.status(httpStatus.NOT_FOUND).json(
      response({
        message: "Access denied: this is not a valid taskId",
        status: "FAIL",
        statusCode: httpStatus.NOT_FOUND,
      })
    );
  }

  const updatedTask = await updateTaskImage(taskId, image);
  return res.status(httpStatus.OK).json(
    response({
      message: "Task image updated successfully",
      status: "SUCCESS",
      statusCode: httpStatus.OK,
      data: updatedTask,
    })
  );
});

module.exports = { taskVerifyController, allTask, task, taskUpdate };



