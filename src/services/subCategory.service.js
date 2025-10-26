const SubCategory = require("../models/subCategory.model");


const subCategoryService = async (data) => {
  const category = await SubCategory.create(data);
  return category;
};


module.exports={subCategoryService}