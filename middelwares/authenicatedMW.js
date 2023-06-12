const jwt = require("jsonwebtoken");
module.exports = (request, response, next) => {
  //check if the request ahs token
  console.log(request.headers.authorization);
  const authHeader = request.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC_KEY, (err, user) => {
      if (err) {
        let error = new Error("Token is not valid!");
        error.status = 403;
        next(error);
      } else {
        console.log("asdasdsa", user);
        request.accessToken = user;
        console.log(request.accessToken);
        next();
      }
    });
  } else {
    let error = new Error("you are not authenticated!");
    error.status = 401;
    next(error);
  }
};

module.exports.isAdmin = (request, repsone, next) => {
  if (request.accessToken.isAdmin) next();
  else {
    let error = new Error("not Authorized");
    error.status = 403;
    next(error);
  }
};
