const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");
const {
  subCategoryService,
  GetSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../services/subCategory.service");
const Category = require("../models/category.model");
const SubCategory = require("../models/subCategory.model");

// ✅ Create SubCategory
const subCategory = catchAsync(async (req, res) => {
  const categoryId = req.params.id;
  const data = req.body;
  const user = req.user.id;

  // Check if Category exists
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

  // Check for duplicate SubCategory under same Category
  const existingSubCategory = await SubCategory.findOne({
    name: data.name.trim().toLowerCase(),
    categoryId: categoryId,
  });

  if (existingSubCategory) {
    return res.status(httpStatus.CONFLICT).json(
      response({
        message: `Subcategory '${data.name}' already exists under this category`,
        status: "FAIL",
        statusCode: httpStatus.CONFLICT,
      })
    );
  }

  // Create new SubCategory
  const categoryData = { ...data, categoryId: checkCategory._id, user };
  const category = await subCategoryService(categoryData);

  res.status(httpStatus.CREATED).json(
    response({
      message: "Subcategory Created Successfully",
      status: "OK",
      statusCode: httpStatus.CREATED,
      data: category,
    })
  );
});

// ✅ Get All SubCategories
const GetSubCategoryController = catchAsync(async (req, res) => {
  const result = await GetSubCategory();
  res.status(httpStatus.OK).json(
    response({
      message: "All Subcategories Retrieved",
      status: "OK",
      statusCode: httpStatus.OK,
      data: result,
    })
  );
});

// ✅ Update SubCategory by ID
const UpdateSubCategoryController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const updated = await updateSubCategory(id, data);

  if (!updated) {
    return res.status(httpStatus.NOT_FOUND).json(
      response({
        message: "Subcategory not found",
        status: "FAIL",
        statusCode: httpStatus.NOT_FOUND,
      })
    );
  }

  res.status(httpStatus.OK).json(
    response({
      message: "Subcategory Updated Successfully",
      status: "OK",
      statusCode: httpStatus.OK,
      data: updated,
    })
  );
});

// ✅ Delete SubCategory by ID
const DeleteSubCategoryController = catchAsync(async (req, res) => {
  const { id } = req.params;

  const deleted = await deleteSubCategory(id);

  if (!deleted) {
    return res.status(httpStatus.NOT_FOUND).json(
      response({
        message: "Subcategory not found",
        status: "FAIL",
        statusCode: httpStatus.NOT_FOUND,
      })
    );
  }

  res.status(httpStatus.OK).json(
    response({
      message: "Subcategory Deleted Successfully",
      status: "OK",
      statusCode: httpStatus.OK,
    })
  );
});

module.exports = {
  subCategory,
  GetSubCategoryController,
  UpdateSubCategoryController,
  DeleteSubCategoryController,
};
