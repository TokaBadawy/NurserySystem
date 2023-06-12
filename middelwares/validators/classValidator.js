const { param, body } = require("express-validator");
module.exports.checkParamsId = param("id")
  .isInt()
  .withMessage("id must be number");
module.exports.addClass = [
  body("name")
    .notEmpty()
    .withMessage("name cant be blank")
    .isString()
    .withMessage("name must be alphapetic"),
  body("supervisor")
    .notEmpty()
    .withMessage("supervisor cant be blank")
    .isMongoId()
    .withMessage("supervisor id must be ObjectId"),
  body("children")
    .notEmpty()
    .withMessage("children cant be blank")
    .isArray()
    .withMessage("children must be array"),
  // .custom((value) => {
  //   if (!value.every(Number.isInteger))
  //     throw new Error("Array does not contain Integers");
  // }),
  body("children.*").isInt().withMessage("child id must  be integer"),
];

module.exports.editClass = [
  body("_id").isInt().withMessage("id must be number"),
  body("name")
    .notEmpty()
    .withMessage("name cant be blank")
    .isString()
    .withMessage("name must be alphapetic")
    .optional(),
  body("supervisor")
    .notEmpty()
    .withMessage("supervisor cant be blank")
    .isMongoId()
    .withMessage("supervisor id must be ObjectId")
    .optional(),
  body("children")
    .notEmpty()
    .withMessage("children cant be blank")
    .isArray()
    .withMessage("children must be array")
    .optional(),
  body("childre.*").isInt().withMessage("child id must be integer").optional(),
];

module.exports.deleteClass = body("_id")
  .isInt()
  .withMessage("id must be number");

module.exports.getClassChildInfo = param("id")
  .isInt()
  .withMessage("id must be number");
module.exports.getClassTeacherInfo = param("id")
  .isInt()
  .withMessage("id must be number");
