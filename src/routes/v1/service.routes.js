const express = require("express");
const auth = require("../../middlewares/auth");
const { serviceController } = require("../../controllers");




const router = express.Router();
router.route("/service/:id").post(auth(), serviceController.serviceController);
module.exports = router;
