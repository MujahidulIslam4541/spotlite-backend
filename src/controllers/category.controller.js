const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");
const { categoryService, getAllCategoriesWithData,GetAllCategory, getCategoryByIdWithData } = require("../services/category.service");
const pick = require("../utils/pick");


const category = catchAsync(async (req, res) => {
  const user = req.user.id;

  if (req.user.role !== "admin") {
    return res.status(httpStatus.UNAUTHORIZED).json(
      response({
        message: "Access denied: only admins can perform this action",
        status: "FAIL",
        statusCode: httpStatus.UNAUTHORIZED,
      })
    );
  }
  
  const categoryData = { ...req.body, user};
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

const getCategory = catchAsync(async (req, res) => {
  const result = await GetAllCategory();
    res.status(httpStatus.OK).json(
    response({
      message: "all category",
      status: "OK",
      statusCode: httpStatus.OK,
      data: result,
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

const getCategoryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const category = await getCategoryByIdWithData(id);
  res.status(200).json({
    message: "Category fetched successfully",
    data: category,
  });
});


module.exports = { category, getCategoryController,getCategory,getCategoryById };
