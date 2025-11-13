const express = require("express");
const auth = require("../../middlewares/auth");
const { orderCreate, getMyOrders, allOrdersController, OrdersController, getOrderDetails, claimedTaskController, getClaimedTasksController } = require("../../controllers/order.Controller");



const router = express.Router();
router.route("/create").post(auth('client'),orderCreate);
router.route("/orders/me").get(auth('client'), getMyOrders);
router.route("/orders").get(auth('admin'), allOrdersController);
router.route("/orders/employ").get(auth('employ'), OrdersController);
router.route("/order/:id").get(auth('employ'), getOrderDetails);
router.route("/claimed/:id").put(auth('employ'), claimedTaskController);
router.route("/claimed/my").get(auth('employ'), getClaimedTasksController);
module.exports = router;
