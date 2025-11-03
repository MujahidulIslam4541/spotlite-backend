const express = require("express");
const auth = require("../../middlewares/auth");
const {
  subCategory,
  GetSubCategoryController,
  UpdateSubCategoryController,
  DeleteSubCategoryController,
} = require("../../controllers/subCategory.controller");

const router = express.Router();

// ✅ Create a new SubCategory under a Category
router.post("/subCategory/:id", auth(), subCategory);

// ✅ Get all SubCategories
router.get("/subCategory", auth(), GetSubCategoryController);

// ✅ Update SubCategory by ID
router.put("/subCategory/:id", auth(), UpdateSubCategoryController);

// ✅ Delete SubCategory by ID
router.delete("/subCategory/:id", auth(), DeleteSubCategoryController);

module.exports = router;
