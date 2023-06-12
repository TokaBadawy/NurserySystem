const express = require("express");
const router = express.Router();
const validator = require("./../middelwares/validators/childValidator");
const validationError = require("./../middelwares/validators/validationError");
const controller = require("./../controllers/childController");
router
  .route("/child")
  .get(controller.getAllChildren)
  .post(validator.addChild, validationError, controller.addChild)
  .patch(validator.editChild, validationError, controller.editChild)
  .delete(validator.deleteChild, validationError, controller.deleteChild);

router
  .route("/child/:id")
  .get(validator.getSingleChild, validationError, controller.getSingleChild);
router
  .route("/child/:id/class")
  .get(validator.getChildClass, validationError, controller.getChildClass);

module.exports = router;
