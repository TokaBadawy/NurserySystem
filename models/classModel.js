const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: {
    type: Number,
    unique: true,
  },
  name: String,
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  children: [
    {
      type: Number,
      unique: true,
      ref: "Child",
    },
  ],
});
schema.pre("save", async function (next) {
  var doc = this;
  await mongoose
    .model("Counters")
    .findOneAndUpdate({ name: "class" }, { $inc: { count: 1 } })
    .then(function (counter) {
      doc._id = counter.count;
      next();
    })
    .catch(function (error) {
      throw error;
    });
});
mongoose.model("Class", schema);
