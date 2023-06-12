const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const validator = require("./../middelwares/validators/authValidator");
const validationError = require("./../middelwares/validators/validationError");

router
  .route("/signup")
  .post(validator.signup, validationError, controller.signup);
router.route("/login").post(validator.login, validationError, controller.login);

module.exports = router;
