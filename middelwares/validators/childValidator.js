const { param, body } = require("express-validator");
module.exports.getSingleChild = param("id")
  .isInt()
  .withMessage("id must be number");
module.exports.addChild = [
  body("fullName")
    .notEmpty()
    .withMessage("name cant be blank")
    .isString()
    .withMessage("name must be alphapetic"),
  body("age").notEmpty().withMessage("age cant be blank"),
  body("level")
    .notEmpty()
    .withMessage("level cant be blank")
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("level must be one of [PreKG,KG1,KG2]"),
  body("address")
    .notEmpty()
    .withMessage("address cant be blank")
    .isObject()
    .withMessage("address should be object"),
  body("address.city")
    .notEmpty()
    .withMessage("city cant be blank")
    .isString()
    .withMessage("name must be alphapetic"),
  body("address.street")
    .notEmpty()
    .withMessage("street cant be blank")
    .isInt()
    .withMessage("street must be number"),
  body("address.building")
    .notEmpty()
    .withMessage("building cant be blank")
    .isInt()
    .withMessage("building must be number"),
];

module.exports.editChild = [
  body("_id").isInt().withMessage("id must be number"),
  body("fullName")
    .notEmpty()
    .withMessage("fullName cant be blank")
    .isString()
    .withMessage("fullName must be alphapetic")
    .optional(),
  body("age").notEmpty().withMessage("age cant be blank").optional(),
  body("level")
    .notEmpty()
    .withMessage("level cant be blank")
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("level must be one of [PreKG,KG1,KG2]")
    .optional(),
  body("address")
    .notEmpty()
    .withMessage("address cant be blank")
    .isObject()
    .withMessage("address should be object")
    .optional(),
  body("address.city")
    .notEmpty()
    .withMessage("city cant be blank")
    .isString()
    .withMessage("name must be alphapetic")
    .optional(),
  body("address.street")
    .notEmpty()
    .withMessage("street cant be blank")
    .optional()
    .isInt()
    .withMessage("street must be number"),
  body("address.building")
    .notEmpty()
    .withMessage("building cant be blank")
    .optional()
    .isInt()
    .withMessage("building must be number"),
];

module.exports.deleteChild = body("_id")
  .isInt()
  .withMessage("id must be number");

module.exports.getChildClass = param("id")
  .isInt()
  .withMessage("id must be number");
