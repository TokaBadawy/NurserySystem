const { param, body } = require("express-validator");

module.exports.login = [
  body("username")
    .notEmpty()
    .withMessage("username cant be blank")
    .isString()
    .withMessage("username must be alphapetic"),
  body("password").notEmpty().withMessage("password cant be blank"),
];

module.exports.signup = [
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
