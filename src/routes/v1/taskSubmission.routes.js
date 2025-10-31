const express = require("express");
const auth = require("../../middlewares/auth");
const { taskVerifyController } = require("../../controllers/taskSubmission.controller");




const router = express.Router();
router.route("/task/:id").post(auth('employ'), taskVerifyController);
module.exports = router;
