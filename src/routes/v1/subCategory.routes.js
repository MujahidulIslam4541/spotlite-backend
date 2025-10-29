const express = require("express");
const auth = require("../../middlewares/auth");
const { subCategoryController } = require("../../controllers");



const router = express.Router();
router.route("/subCategory/:id").post(auth(), subCategoryController.subCategory);
router.route("/subCategory").get(auth(), subCategoryController.GetSubCategoryController);
module.exports = router;
