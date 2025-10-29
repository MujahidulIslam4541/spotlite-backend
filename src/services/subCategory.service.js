const SubCategory = require("../models/subCategory.model");


const subCategoryService = async (data) => {
  const category = await SubCategory.create(data);
  return category;
};
const GetSubCategory = async (data) => {
  const category = await SubCategory.find(data);
  return category;
};


module.exports={subCategoryService,GetSubCategory}