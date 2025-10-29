const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");
const { serviceService, getService } = require("../services/service.service");
const SubCategory = require("../models/subCategory.model");
const Service = require("../models/service.model");

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
        message: `service '${data.name}' already exists under this category`,
        status: "FAIL",
        statusCode: httpStatus.CONFLICT,
      })
    );
  }

  const serviceData = { ...data, subCategoryId: checkSubCategory._id, user };
  const service = await serviceService(serviceData);
  res.status(httpStatus.CREATED).json(
    response({
      message: "service Created",
      status: "OK",
      statusCode: httpStatus.CREATED,
      data: service,
    })
  );
});

const getserviceController=catchAsync(async(req,res)=>{
 const result=await getService()
  res.status(httpStatus.OK).json(
    response({
      message: "all service here",
      status: "OK",
      statusCode: httpStatus.OK,
      data: result,
    })
  );
})

module.exports = { serviceController,getserviceController };
