const express = require("express");
const auth = require("../../middlewares/auth");
const { categoryController } = require("../../controllers");

const router = express.Router();
router.route("/category").post(auth(), categoryController.category);
router.route("/categories").get(auth(), categoryController.getCategoryController);

module.exports = router;
