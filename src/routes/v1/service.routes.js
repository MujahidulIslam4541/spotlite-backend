const express = require("express");
const auth = require("../../middlewares/auth");
const {
  serviceController,
  getserviceController,
  updateServiceController,
  deleteServiceController,
} = require("../../controllers/service.controller");

const router = express.Router();

// Create a new service under a specific subcategory
router.post("/service/:id", auth(), serviceController);

// Get all services
router.get("/service", auth(), getserviceController);

// Update service by ID
router.put("/service/:id", auth(), updateServiceController);

// Delete service by ID
router.delete("/service/:id", auth(), deleteServiceController);

module.exports = router;
