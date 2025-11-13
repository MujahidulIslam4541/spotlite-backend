const express = require("express");
const auth = require("../../middlewares/auth");
const {
  createTerms,
  updateTermsController,
  deleteTermsController,
  getTermsController,
} = require("../../controllers/termsAndCondition.controller");
const router = express.Router();

router.route("/create").post(auth("admin"), createTerms);
router.route("/terms/:id").put(auth("admin"), updateTermsController);
router.route("/terms/:id").delete(auth("admin"), deleteTermsController);
router.route("/allTerms").get(auth( "admin"), getTermsController);

module.exports = router;
