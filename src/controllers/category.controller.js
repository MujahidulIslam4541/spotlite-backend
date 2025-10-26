const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");
const { categoryService, getAllCategoriesWithData } = require("../services/category.service");


const category = catchAsync(async (req, res) => {
  const user = req.user.id;

  // if (user.role !== "admin") {
  //   return res.status(httpStatus.UNAUTHORIZED).json(
  //     response({
  //       message: "UnAuthorized access",
  //       status: "FAIL",
  //       statusCode: httpStatus.UNAUTHORIZED,
  //     })
  //   );
  // }
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

const getCategoryController = catchAsync(async (req, res) => {
  const categories = await getAllCategoriesWithData();

  res.status(httpStatus.OK).json(
    response({
      message: "All Categories with SubCategories and Services fetched successfully",
      status: "OK",
      statusCode: httpStatus.OK,
      data: categories.map((cat) => ({
        attributes: cat,
      })),
    })
  );
});

module.exports = { category, getCategoryController };
