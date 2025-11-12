const Service = require("../models/service.model");

// Create
const serviceService = async (data) => {
  const category = await Service.create(data);
  return category;
};

// Read
const getService = async (filter = {}) => {
  const category = await Service.find(filter);
  return category;
};

const getServiceById = async (id) => {
  const service = await Service.findById(id);
  return service;
};

// ✅ Update by ID
const updateService = async (id, data) => {
  const updated = await Service.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return updated;
};

// ✅ Delete by ID
const deleteService = async (id) => {
  const deleted = await Service.findByIdAndDelete(id);
  return deleted;
};

module.exports = { serviceService, getService, updateService, deleteService ,getServiceById};
