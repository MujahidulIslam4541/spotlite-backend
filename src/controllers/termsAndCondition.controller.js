const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");
const { createTermsService } = require("../services/termsAndCondition.service");

const createTerms = catchAsync(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(httpStatus.UNAUTHORIZED).json(
      response({
        message: "Access denied: only admin can create terms",
        status: "FAIL",
        statusCode: httpStatus.UNAUTHORIZED,
      })
    );
  }

  const terms = await createTermsService(req.body);
  res.status(httpStatus.CREATED).json(
    response({
      message: "Terms created successfully",
      status: "OK",
      statusCode: httpStatus.CREATED,
      data: terms,
    })
  );
});

module.exports={createTerms}
