const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");
const { serviceService } = require("../services/service.service");

const serviceController = catchAsync(async (req, res) => {
  const subCategoryId = req.params.id;
  const data = req.body;
  const user = req.user.id;

  const serviceData = { ...data, subCategoryId, user };
  const service = await serviceService(serviceData);
  res.status(httpStatus.CREATED).json(
    response({
      message: "service Created",
      status: "OK",
      statusCode: httpStatus.CREATED,
      data: service,
    })
  );
});

module.exports = { serviceController };
