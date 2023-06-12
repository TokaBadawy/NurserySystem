const { validationResult } = require("express-validator");
module.exports = (request, response, next) => {
  let result = validationResult(request);
  if (result.errors.length != 0) {
    // console.log(result);
    let errorSrting = result.errors.reduce(
      (current, object) => current + object.msg + " , ",
      " "
    );
    console.log(errorSrting);
    let error = new Error(errorSrting);
    error.status = 422;
    // console.log(error);
    next(error);
  } else next();
};
