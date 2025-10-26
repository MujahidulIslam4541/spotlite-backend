const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");
const { subCategoryService } = require("../services/subCategory.service");
const Category = require("../models/category.model");

const subCategory = catchAsync(async (req, res) => {
  const categoryId = req.params.id;
  const data = req.body;
  const user = req.user.id;

  const checkCategory = await Category.findById(categoryId);
  if (!checkCategory) {
    return res.status(httpStatus.BAD_REQUEST).json(
      response({
        message: "Invalid Category ID",
        status: "FAIL",
        statusCode: httpStatus.BAD_REQUEST,
      })
    );
  }

  const categoryData = { ...data, categoryId, user };
  const category = await subCategoryService(categoryData);
  res.status(httpStatus.CREATED).json(
    response({
      message: "Subcategory Created",
      status: "OK",
      statusCode: httpStatus.CREATED,
      data: category,
    })
  );
});

module.exports = { subCategory };
