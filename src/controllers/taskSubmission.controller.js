const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");
const Order = require("../models/order.model");
const { taskVerifyService, allVerifyTask, singleTask, updateTaskImage } = require("../services/taskSubmission.service");
const TaskSubmission = require("../models/TaskSubmissions");

// create task only employ
const taskVerifyController = catchAsync(async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;
  const { name, email, number, location, proofImage } = req.body;

  if (req.user.role !== "employ") {
    return res.status(httpStatus.UNAUTHORIZED).json(
      response({
        message: "Access denied: only employ can perform this action",
        status: "FAIL",
        statusCode: httpStatus.UNAUTHORIZED,
      })
    );
  }

  const order = await Order.findById(taskId).populate({
    path: "serviceId",
    select: "pricePerUnit",
  });

  if (!order) {
    return res.status(httpStatus.NOT_FOUND).json(
      response({
        message: "Order not found",
        status: "FAIL",
        statusCode: httpStatus.NOT_FOUND,
      })
    );
  }

  const perServicePrice = order?.serviceId?.pricePerUnit || 0;

  const employEarning = perServicePrice * 0.5;

  const verifyData = {
    taskId,
    userId,
    verification: {
      name,
      email,
      number,
      location,
    },
    proofImage: proofImage || null,
    status: "verified",
    isVerified: true,
    earning: employEarning,
  };

  const result = await taskVerifyService(verifyData);

  res.status(httpStatus.OK).json(
    response({
      message: "Employ task verification submitted successfully",
      status: "OK",
      statusCode: httpStatus.OK,
      data: result,
    })
  );
});

// get all task if is Verified
const allTask = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  if (!userId) {
    return res.status(httpStatus.UNAUTHORIZED).json(
      response({
        message: "Access denied: You are not valid employ",
        status: "FAIL",
        statusCode: httpStatus.UNAUTHORIZED,
      })
    );
  }

  const result = await allVerifyTask({ userId, page, limit });

  res.status(httpStatus.OK).json(
    response({
      message: "All verified tasks fetched successfully",
      status: "OK",
      statusCode: httpStatus.OK,
      data: result,
    })
  );
});

// single task get is verified
const task = catchAsync(async (req, res) => {
  const taskId = req.params.id;

  const taskData = await TaskSubmission.findById(taskId)
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
      message: "Verified task fetched successfully",
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


module.exports = { taskVerifyController, allTask ,task,taskUpdate};
