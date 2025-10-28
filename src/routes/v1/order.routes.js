const express = require("express");
const auth = require("../../middlewares/auth");
const { orderCreate } = require("../../controllers/order.Controller");



const router = express.Router();
router.route("/order/:id").post(auth(),orderCreate);
module.exports = router;
