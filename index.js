require("./models/classModel");
require("./models/childModel");
require("./models/teacherModel");
require("./models/counterModel");
require("dotenv").config();
const express = require("express");
const server = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const teacherRoute = require("./routes/teacherRoute");
const classRoute = require("./routes/classRoute");
const childRoute = require("./routes/childRoute");
const authRoute = require("./routes/authRoute");
const authMW = require("./middelwares/authenicatedMW");
let port = process.env.PORT || 8080;
server.use(morgan("common"));
// server.use(cors());
server.use(express.json());
mongoose
  .connect("mongodb://127.0.0.1:27017/ITISystem")
  .then(() => {
    console.log("DB Connected ");
    server.listen(port, () => {
      console.log(`server is listening at port: ${port}`);
    });
  })
  .catch((error) => console.log(error));

// const Class = mongoose.model("Class");
server.use(authRoute);
// server.use(authMW);
server.use(teacherRoute);
server.use(childRoute);
server.use(classRoute);
// server.post("/login", (request, response, next) => {
//   console.log(request.body);
// });
server.use((request, response, next) => {
  response.status(404).json({ message: "Page Not Found..!" });
});
server.use((error, request, response, next) => {
  // console.log(error);
  response.status(error.status || 505).json({ message: error + "" });
});

// server.get("/", (request, response, next) => {
//   response.status(200).json("Welcome Home..");
// });
// server.post("/login", (request, response, next) => {
//   console.log(request.body);
//   try {
//     if (request.body.username && request.body.password) {
//       if (request.body.username === "admin") {
//         if (request.body.password == "123456") {
//           response.status(200).json({ message: "Authenticated.." });
//         } else {
//           response.status(401).json({ message: "wrong password.." });
//         }
//       } else {
//         response.status(401).json({ message: "wrong username.." });
//       }
//     } else {
//       console.log("** error ** ");
//     }
//   } catch (err) {
//     next(err);
//   }
// });
