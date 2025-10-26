const express = require("express");
const auth = require("../../middlewares/auth");
const { categoryController } = require("../../controllers");



const router = express.Router();
router.route("/category").post(auth(), categoryController.category);
module.exports = router;
