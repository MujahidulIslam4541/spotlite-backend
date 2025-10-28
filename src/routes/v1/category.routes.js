const express = require("express");
const auth = require("../../middlewares/auth");
const { categoryController } = require("../../controllers");

const router = express.Router();
router.route("/category").post(auth('admin'), categoryController.category);
router.route("/categories").get(auth(), categoryController.getCategoryController);
router.route("/category").get(auth(), categoryController.getCategories);

module.exports = router;
