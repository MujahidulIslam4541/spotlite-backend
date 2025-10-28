const Category = require("../models/category.model");
const SubCategory = require("../models/subCategory.model");
const Service = require("../models/service.model");

const categoryService = async (data) => {
  const category = await Category.create(data);
  return category;
};

const categoryGet = async (filter = {}, options = {}) => {
  const { limit = 10, page = 1 } = options;

  const count = await Category.countDocuments(filter);
  const totalPages = Math.ceil(count / limit);
  const skip = (page - 1) * limit;

  const categories = await Category.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 }); // optional: sort newest first

  if (!categories || !categories.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "No categories found");
  }

  return {
    data: categories,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages,
    totalResults: count,
  };
};



const getAllCategoriesWithData = async () => {
  const categories = await Category.find().select('name')
    .populate({ path: "createdBy", select: "fullName email" })
    .lean();

  for (const category of categories) {
    const subCategories = await SubCategory.find({ categoryId: category._id }).select('name')
      .populate({ path: "createdBy", select: "fullName email" })
      .lean();

    for (const subCategory of subCategories) {
      const services = await Service.find({ subCategoryId: subCategory._id }).select('name pricePerUnit')
        .populate({ path: "createdBy", select: "fullName email" })
        .lean();

      subCategory.services = services.map((service) => ({ attributes: service }));
    }

    category.subCategories = subCategories.map((sub) => ({ attributes: sub }));
  }

  return categories;
};

module.exports = { categoryService, getAllCategoriesWithData,categoryGet };
