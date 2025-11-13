const termsConditionsModel = require("../models/termsConditions.model");

const createTermsService = async (data) => {
  const task = await termsConditionsModel.create(data);
  return task;
};

module.exports = {
  createTermsService,
};
