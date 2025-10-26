const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");
const { categoryService } = require("../services/category.service");

const category = catchAsync(async (req, res) => {
  const user = req.user.id;
  const categoryData = { ...req.body, user };
  const category = await categoryService(categoryData);
  res.status(httpStatus.CREATED).json(
    response({
      message: "category Created",
      status: "OK",
      statusCode: httpStatus.CREATED,
      data: category,
    })
  );
});


module.exports={category}
