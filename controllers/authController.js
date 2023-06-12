const mongoose = require("mongoose");
// const Child = mongoose.model("Child");
// const Class = mongoose.model("Class");
const Teacher = mongoose.model("Teacher");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
exports.login = async (request, response, next) => {
  try {
    const user = await Teacher.findOne({ username: request.body.username });
    if (!user) {
      let error = new Error("wrong username!");
      error.status = 401;
      next(error);
    } else {
      const hashedPass = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );
      const originalPassword = hashedPass.toString(CryptoJS.enc.Utf8);
      if (originalPassword !== request.body.password) {
        let error = new Error("wrong password!");
        error.status = 401;
        next(error);
      } else {
        // console.log(user);
        const { password, ...others } = user._doc;
        const accessTokenn = jwt.sign(
          {
            _id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SEC_KEY,
          { expiresIn: "1d" }
        );
        others.accessToken = accessTokenn;
        response.status(200).json({ ...others });
        // console.log("logged in");
      }
    }
  } catch (err) {
    console.log(err);
    let error = new Error(err);
    error.status = 401;
    next(error);
  }
};

exports.signup = async (request, response, next) => {
  const newUser = new Teacher({
    fullName: request.body.fullName,
    username: request.body.username,
    email: request.body.email,
    password: CryptoJS.AES.encrypt(
      request.body.password,
      process.env.PASS_SEC
    ).toString(),
    image: request.body.image,
  });
  try {
    // new user
    const savedUser = await newUser.save();
    // console.log(savedUser);
    const { password, ...others } = savedUser._doc;
    response.status(201).json(others);
  } catch (err) {
    let error = new Error(err);
    error.status = 401;
    next(error);
  }
};
