const express = require("express");
const auth = require("../../middlewares/auth");
const { orderCreate, getMyOrders } = require("../../controllers/order.Controller");



const router = express.Router();
router.route("/order/:id").post(auth('client'),orderCreate);
router.route("/orders/me").get(auth('client'), getMyOrders);
module.exports = router;
