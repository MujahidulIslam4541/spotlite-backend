const express = require("express");
const auth = require("../../middlewares/auth");
const { createTerms } = require("../../controllers/termsAndCondition.controller");
const router = express.Router();


router.route("/create").post(auth('admin'),createTerms);


module.exports = router;