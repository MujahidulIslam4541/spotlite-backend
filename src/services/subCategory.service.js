const SubCategory = require("../models/subCategory.model");

// ✅ Create SubCategory
const subCategoryService = async (data) => {
  const category = await SubCategory.create(data);
  return category;
};

// ✅ Get All SubCategories
const GetSubCategory = async (filter = {}) => {
  const category = await SubCategory.find(filter);
  return category;
};

// ✅ Update SubCategory by ID
const updateSubCategory = async (id, data) => {
  const updated = await SubCategory.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return updated;
};

// ✅ Delete SubCategory by ID
const deleteSubCategory = async (id) => {
  const deleted = await SubCategory.findByIdAndDelete(id);
  return deleted;
};

module.exports = {
  subCategoryService,
  GetSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
