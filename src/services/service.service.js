const  service  = require("../models/service.model");


const serviceService = async (data) => {
  const category = await service.create(data);
  return category;
};
const getService = async (data) => {
  const category = await service.find(data);
  return category;
};


module.exports={serviceService,getService}