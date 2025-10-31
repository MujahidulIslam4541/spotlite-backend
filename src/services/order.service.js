const Order = require("../models/order.model");

const orderService = async (data) => {
  const order = await Order.create(data);
  return order;
};

const getOrdersByUser = async (userId, options = {}) => {
  const { limit = 10, page = 1 } = options;

  const filter = { userId };
  const count = await Order.countDocuments(filter);
  const totalPages = Math.ceil(count / limit);
  const skip = (page - 1) * limit;

  const orders = await Order.find(filter)
    // .populate({
    //   path: "serviceId",
    //   // select: "name pricePerUnit subCategoryId totalPrice",
    //   // populate: { path: "subCategoryId", select: "name categoryId" },
    // })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  return {
    data: orders,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages,
    totalResults: count,
  };
};

const allOrders = async (filter = {}, options = {}) => {
  const { limit = 10, page = 1 } = options;

  const count = await Order.countDocuments(filter);
  const totalPages = Math.ceil(count / limit);
  const skip = (page - 1) * limit;

  const orders = await Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();

  return {
    data: orders,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages,
    totalResults: count,
  };
};

// orders for employs
const Orders = async (filter = {}, options = {}) => {
  const { limit = 10, page = 1 } = options;
  const queryFilter = { ...filter, quantity: { $gt: 0 } };

  const count = await Order.countDocuments(filter);
  const totalPages = Math.ceil(count / limit);
  const skip = (page - 1) * limit;

  const orders = await Order.find(queryFilter)
    .populate({
      path: "serviceId",
      populate: { path: "subCategoryId", select: "name  -_id", populate: { path: "categoryId", select: "name -_id" } },
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const filteredOrders = orders.map((order) => ({
    categoryName: order.serviceId?.subCategoryId?.categoryId?.name,
    subCategoryName: order.serviceId?.subCategoryId?.name,
    orderName: order.orderName,
    quantity: order.quantity,
    addLink: order.addLink,
    addComment: order.addComment,
    createdAt: order.createdAt,
    id: order._id,
  }));

  return {
    data: filteredOrders,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages,
    totalResults: count,
  };
};

// order details for employ
const ordersDetails = async (data) => {
  const order = await Order.findOne(data).populate({
    path: "serviceId",
    populate: { path: "subCategoryId", select: "name  -_id", populate: { path: "categoryId", select: "name -_id" } },
  });

  const orders = {
    categoryName: order.serviceId?.subCategoryId?.categoryId?.name,
    subCategoryName: order.serviceId?.subCategoryId?.name,
    orderName: order.orderName,
    quantity: order.quantity,
    addLink: order.addLink,
    addComment: order.addComment,
    createdAt: order.createdAt,
    id: order._id,
  };

  return orders;
};

module.exports = { orderService, getOrdersByUser, allOrders, Orders, ordersDetails };
