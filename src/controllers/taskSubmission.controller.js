const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");
const { taskVerifyService } = require("../services/taskSubmission.service");

const taskVerifyController = catchAsync(async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;
  const data = req.body;

  if (req.user.role !== "employ") {
    return res.status(httpStatus.UNAUTHORIZED).json(
      response({
        message: "Access denied: only employ can perform this action",
        status: "FAIL",
        statusCode: httpStatus.UNAUTHORIZED,
      })
    );
  }

  const verifyData = { taskId, userId, data };
  const result = await taskVerifyService(verifyData);
  res.status(httpStatus.OK).json(
    response({
      message: "employ task verify success",
      status: "OK",
      statusCode: httpStatus.OK,
      data: result,
    })
  );
});

module.exports={taskVerifyController}
