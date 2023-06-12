const express = require("express");
const router = express.Router();
const validator = require("./../middelwares/validators/teacherValidator");
const validationError = require("./../middelwares/validators/validationError");
const controller = require("./../controllers/teacherController");
const { isAdmin } = require("./../middelwares/authenicatedMW");
router
  .route("/teachers")
  .all(isAdmin)
  .get(controller.getAllTeachers)
  .post(validator.addTeacher, validationError, controller.addTeacher)
  .put(validator.editTeacher, validationError, controller.editTeacher)
  .delete(validator.deleteTeacher, validationError, controller.deleteTeacher);
router.route("/teachers/supervise").get(controller.getSupervise);
router
  .route("/teachers/:id")
  .all(isAdmin)
  .get(
    validator.getSingleTeacher,
    validationError,
    controller.getSingleTeacher
  );

module.exports = router;
