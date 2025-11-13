const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");
const {
  orderService,
  getOrdersByUser,
  allOrders,
  Orders,
  ordersDetails,
  claimedTask,
  getClaimedTasks,
} = require("../services/order.service");
const { getServiceById } = require("../services/service.service");
const { update } = require("lodash");

// order only client
const orderCreate = catchAsync(async (req, res) => {
  const { quantity = 1, addLink, addComment, serviceId } = req.body;
  const clientId = req.user.id;

  if (req.user.role !== "client") {
    return res.status(httpStatus.FORBIDDEN).json(
      response({
        message: "Access denied: only clients can place orders",
        status: "FAIL",
        statusCode: httpStatus.FORBIDDEN,
      })
    );
  }
  const service = await getServiceById(serviceId);
  if (!service) {
    return res.status(httpStatus.NOT_FOUND).json(
      response({
        message: "Service not found",
        status: "FAIL",
        statusCode: httpStatus.NOT_FOUND,
      })
    );
  }

  const totalPrice = service.pricePerUnit * quantity;

  const createOrder = {
    clientId,
    serviceId,
    addLink,
    addComment,
    totalPrice,
    quantity,
    orderName: service.name,
  };

  const order = await orderService(createOrder);
  return res.status(httpStatus.CREATED).json(
    response({
      message: "Order created successfully",
      status: "SUCCESS",
      statusCode: httpStatus.CREATED,
      data: order,
    })
  );
});

// get  my  order client
const getMyOrders = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { page, limit } = req.query;

  const orders = await getOrdersByUser(userId, { page, limit });

  res.status(httpStatus.OK).json(
    response({
      message: "User orders fetched successfully",
      status: "SUCCESS",
      statusCode: httpStatus.OK,
      data: orders,
    })
  );
});

// all orders only admin
const allOrdersController = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  if (req.user.role !== "admin") {
    return res.status(httpStatus.UNAUTHORIZED).json(
      response({
        message: "Access denied: only admins can perform this action",
        status: "FAIL",
        statusCode: httpStatus.UNAUTHORIZED,
      })
    );
  }

  const result = await allOrders({ page, limit });
  res.status(httpStatus.OK).json(
    response({
      message: "All orders fetched successfully",
      status: "SUCCESS",
      statusCode: httpStatus.OK,
      data: result,
    })
  );
});

//   orders only employ and her feed
const OrdersController = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const userId = req.user.id;
  if (req.user.role !== "employ") {
    return res.status(httpStatus.UNAUTHORIZED).json(
      response({
        message: "Access denied: only employ can perform this action",
        status: "FAIL",
        statusCode: httpStatus.UNAUTHORIZED,
      })
    );
  }

  const result = await Orders(page, limit, userId);
  res.status(httpStatus.OK).json(
    response({
      message: "All orders fetched successfully",
      status: "SUCCESS",
      statusCode: httpStatus.OK,
      data: result,
    })
  );
});

// get order details
const getOrderDetails = catchAsync(async (req, res) => {
  const { orderId } = req.params.id;

  const orders = await ordersDetails(orderId);
  res.status(httpStatus.OK).json(
    response({
      message: "User orders fetched successfully",
      status: "SUCCESS",
      statusCode: httpStatus.OK,
      data: orders,
    })
  );
});

// claimed task
const claimedTaskController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const updated = await claimedTask(id, userId);
  if (!updated) {
    return res.status(httpStatus.NOT_FOUND).json(
      response({
        message: "Service not found",
        status: "FAIL",
        statusCode: httpStatus.NOT_FOUND,
      })
    );
  }

  // order.quantity = order.quantity - 1;
  // await order.save();

  res.status(httpStatus.OK).json(
    response({
      message: "Task claimed successfully",
      status: "OK",
      statusCode: httpStatus.OK,
      data: updated,
    })
  );
});

// get my claimed task only
const getClaimedTasksController = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { page, limit } = req.query;

  const result = await getClaimedTasks(userId, { page, limit });

  if (!result.data.length) {
    return res.status(httpStatus.OK).json(
      response({
        message: "You haven't claimed any tasks yet.",
        status: "OK",
        statusCode: httpStatus.OK,
        data: [],
      })
    );
  }
  res.status(httpStatus.OK).json(
    response({
      message: "Claimed tasks fetched successfully.",
      status: "OK",
      statusCode: httpStatus.OK,
      data: result,
    })
  );
});

module.exports = {
  orderCreate,
  getMyOrders,
  allOrdersController,
  OrdersController,
  getOrderDetails,
  claimedTaskController,
  getClaimedTasksController
};
