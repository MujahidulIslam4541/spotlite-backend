const Order = require("../models/order.model")

const orderService=async(data)=>{
  const order=await Order.create(data)
  return order;
}

module.exports={orderService}