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

module.exports = { categoryService, getAllCategoriesWithData, GetAllCategory };
