const express = require("express");
const auth = require("../../middlewares/auth");
const { orderCreate, getMyOrders, allOrdersController } = require("../../controllers/order.Controller");



const router = express.Router();
router.route("/order/:id").post(auth('client'),orderCreate);
router.route("/orders/me").get(auth('client'), getMyOrders);
router.route("/orders").get(auth('admin'), allOrdersController);
module.exports = router;
