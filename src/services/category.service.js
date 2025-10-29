const Category = require("../models/category.model");
const SubCategory = require("../models/subCategory.model");
const Service = require("../models/service.model");

const categoryService = async (data) => {
  const category = await Category.create(data);
  return category;
};

const GetAllCategory = async (data) => {
  const category = await Category.find(data)
  return category;
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


const getCategoryByIdWithData = async (categoryId) => {
  // Step 1: Find that specific category
  const category = await Category.findById(categoryId)
    .select("name")
    .populate({ path: "createdBy", select: "fullName email" })
    .lean();

  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
  }

  // Step 2: Find subcategories under this category
  const subCategories = await SubCategory.find({ categoryId: category._id })
    .select("name")
    .populate({ path: "createdBy", select: "fullName email" })
    .lean();

  // Step 3: For each subcategory, find related services
  for (const subCategory of subCategories) {
    const services = await Service.find({ subCategoryId: subCategory._id })
      .select("name pricePerUnit")
      .populate({ path: "createdBy", select: "fullName email" })
      .lean();

    subCategory.services = services.map((service) => ({ attributes: service }));
  }

  // Step 4: Attach subcategories to the category
  category.subCategories = subCategories.map((sub) => ({ attributes: sub }));

  return category;
};
 

module.exports = { categoryService, getAllCategoriesWithData, GetAllCategory,getCategoryByIdWithData };
