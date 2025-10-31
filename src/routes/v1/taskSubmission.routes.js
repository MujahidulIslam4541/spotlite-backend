const express = require("express");
const auth = require("../../middlewares/auth");
const { taskVerifyController, allTask, task } = require("../../controllers/taskSubmission.controller");




const router = express.Router();
router.route("/task/:id").post(auth('employ'), taskVerifyController);
router.route("/task").get(auth('employ'), allTask);
router.route("/task/:id").get(auth('employ'), task);
module.exports = router;
