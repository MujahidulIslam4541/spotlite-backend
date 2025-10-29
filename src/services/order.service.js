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

const allOrders=async(data)=>{
  const orders=await Order.find(data)
  return orders;
}

module.exports = { orderService,getOrdersByUser ,allOrders};
