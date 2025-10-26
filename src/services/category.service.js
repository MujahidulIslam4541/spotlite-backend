const Category  = require('../models/category.model');

const categoryService = async (data) => {
  const category = await Category.create(data);
  return category;
};


module.exports={categoryService}