const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");
const { subCategoryService } = require("../services/subCategory.service");

const subCategory = catchAsync(async (req, res) => {
  const categoryId = req.params.id;
  const data = req.body;
  const user = req.user.id;

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
