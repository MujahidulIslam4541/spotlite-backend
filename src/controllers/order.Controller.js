const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");
const Service = require("../models/service.model");
const { orderService } = require("../services/order.service");

const orderCreate = catchAsync(async (req, res) => {
  const { quantity = 1, addLink, addComment } = req.body;
  const userId = req.user.id;
  const serviceId = req.params.id;

  if (req.user.role !== "client") {
    return res.status(httpStatus.FORBIDDEN).json(
      response({
        message: "Access denied: only clients can place orders",
        status: "FAIL",
        statusCode: httpStatus.FORBIDDEN,
      })
    );
  }
  const service = await Service.findById(serviceId);
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
    userId,
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

module.exports = { orderCreate };
