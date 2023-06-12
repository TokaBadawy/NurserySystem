const express = require("express");
const router = express.Router();
const validator = require("./../middelwares/validators/classValidator");
const validationError = require("./../middelwares/validators/validationError");
const controller = require("./../controllers/classController");
router
  .route("/class")
  .get(controller.getAllClasses)
  .post(validator.addClass, validationError, controller.addClass)
  .put(validator.editClass, validationError, controller.editClass)
  .delete(validator.deleteClass, validationError, controller.deleteClass);

router
  .route("/class/:id")
  .get(validator.checkParamsId, validationError, controller.getSingleClass);
router
  .route("/class/:id/child")
  .get(validator.checkParamsId, validationError, controller.getClassChildInfo);
router
  .route("/class/:id/teacher")
  .get(
    validator.checkParamsId,
    validationError,
    controller.getClassTeacherInfo
  );

module.exports = router;
