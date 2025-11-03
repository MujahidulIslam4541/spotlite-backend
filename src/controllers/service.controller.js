const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");
const {
  serviceService,
  getService,
  updateService,
  deleteService,
} = require("../services/service.service");
const SubCategory = require("../models/subCategory.model");
const Service = require("../models/service.model");

// Create Service
const serviceController = catchAsync(async (req, res) => {
  const subCategoryId = req.params.id;
  const data = req.body;
  const user = req.user.id;

  const checkSubCategory = await SubCategory.findById(subCategoryId);
  if (!checkSubCategory) {
    return res.status(httpStatus.BAD_REQUEST).json(
      response({
        message: "Invalid SubCategory ID",
        status: "FAIL",
        statusCode: httpStatus.BAD_REQUEST,
      })
    );
  }

  const existingService = await Service.findOne({
    name: data.name.trim().toLowerCase(),
    subCategoryId: checkSubCategory._id,
  });

  if (existingService) {
    return res.status(httpStatus.CONFLICT).json(
      response({
        message: `Service '${data.name}' already exists under this category`,
        status: "FAIL",
        statusCode: httpStatus.CONFLICT,
      })
    );
  }

  const serviceData = { ...data, subCategoryId: checkSubCategory._id, user };
  const service = await serviceService(serviceData);

  res.status(httpStatus.CREATED).json(
    response({
      message: "Service created successfully",
      status: "OK",
      statusCode: httpStatus.CREATED,
      data: service,
    })
  );
});

// Get all Services
const getserviceController = catchAsync(async (req, res) => {
  const result = await getService();
  res.status(httpStatus.OK).json(
    response({
      message: "All services retrieved",
      status: "OK",
      statusCode: httpStatus.OK,
      data: result,
    })
  );
});

// ✅ Update Service by ID
const updateServiceController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const updated = await updateService(id, data);

  if (!updated) {
    return res.status(httpStatus.NOT_FOUND).json(
      response({
        message: "Service not found",
        status: "FAIL",
        statusCode: httpStatus.NOT_FOUND,
      })
    );
  }

  res.status(httpStatus.OK).json(
    response({
      message: "Service updated successfully",
      status: "OK",
      statusCode: httpStatus.OK,
      data: updated,
    })
  );
});

// ✅ Delete Service by ID
const deleteServiceController = catchAsync(async (req, res) => {
  const { id } = req.params;

  const deleted = await deleteService(id);

  if (!deleted) {
    return res.status(httpStatus.NOT_FOUND).json(
      response({
        message: "Service not found",
        status: "FAIL",
        statusCode: httpStatus.NOT_FOUND,
      })
    );
  }

  res.status(httpStatus.OK).json(
    response({
      message: "Service deleted successfully",
      status: "OK",
      statusCode: httpStatus.OK,
    })
  );
});

module.exports = {
  serviceController,
  getserviceController,
  updateServiceController,
  deleteServiceController,
};
