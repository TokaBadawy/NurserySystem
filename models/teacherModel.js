const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  fullName: String,
  password: String,
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  image: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

mongoose.model("Teacher", schema);
