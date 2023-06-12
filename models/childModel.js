const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema(
  {
    city: String,
    street: Number,
    building: Number,
  },
  { _id: false }
);
const schema = new mongoose.Schema({
  _id: {
    type: Number,
    unique: true,
  },
  fullName: String,
  age: Number,
  level: {
    type: String,
    enum: ["PreKG", "KG1", "KG2"],
  },
  address: addressSchema,
});
schema.pre("save", async function (next) {
  var doc = this;
  await mongoose
    .model("Counters")
    .findOneAndUpdate({ name: "child" }, { $inc: { count: 1 } })
    .then(function (counter) {
      doc._id = counter.count;
      next();
    })
    .catch(function (error) {
      throw error;
    });
});
mongoose.model("Child", schema);
