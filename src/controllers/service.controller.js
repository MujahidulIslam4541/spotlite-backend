const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");
const { serviceService } = require("../services/service.service");
const SubCategory = require("../models/subCategory.model");

const serviceController = catchAsync(async (req, res) => {
  const subCategoryId = req.params.id;
  const data = req.body;
  const user = req.user.id;

  const checkSubCategory = await SubCategory.findById(subCategoryId);
    if (!checkSubCategory) {
      return res.status(httpStatus.BAD_REQUEST).json(
        response({
          message: "Invalid SubCategory ID",
          status: "FAIL",
          statusCode: httpStatus.BAD_REQUEST,
        })
      );
    }

  const serviceData = { ...data, checkSubCategory, user };
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
