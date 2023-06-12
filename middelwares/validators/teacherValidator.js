const { param, body } = require("express-validator");
module.exports.getSingleTeacher = param("id")
  .isMongoId()
  .withMessage("id must be mongo ObjectId");
module.exports.addTeacher = [
  body("_id").isMongoId().withMessage("id must be mongo ObjectId").optional(),
  body("fullName")
    .notEmpty()
    .withMessage("name cant be blank")
    .isString()
    .withMessage("name must be alphapetic"),
  body("username")
    .notEmpty()
    .withMessage("username cant be blank")
    .isString()
    .withMessage("username must be alphapetic"),
  body("password").notEmpty().withMessage("password cant be blank"),
  body("email")
    .notEmpty()
    .withMessage("email cant be blank")
    .isEmail()
    .withMessage("enter valid email"),
  body("image")
    .notEmpty()
    .withMessage("image cant be blank")
    .isString()
    .withMessage("image should be string"),
];

module.exports.editTeacher = [
  body("_id").isMongoId().withMessage("id must be mongo ObjectId"),
  body("fullName")
    .notEmpty()
    .withMessage("name cant be blank")
    .isString()
    .withMessage("name must be alphapetic")
    .optional(),
  body("username")
    .notEmpty()
    .withMessage("username cant be blank")
    .isString()
    .withMessage("username must be alphapetic")
    .optional(),
  body("password").notEmpty().withMessage("password cant be blank").optional(),
  body("email")
    .notEmpty()
    .withMessage("email cant be blank")
    .isEmail()
    .withMessage("enter valid email")
    .optional(),
  body("image")
    .notEmpty()
    .withMessage("image cant be blank")
    .isString()
    .withMessage("image should be string")
    .optional(),
];

module.exports.deleteTeacher = body("_id")
  .isMongoId()
  .withMessage("id must be mongo ObjectId");
