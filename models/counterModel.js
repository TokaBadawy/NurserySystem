const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});

mongoose.model("Counters", schema);
(async () => {
  if (!(await mongoose.model("Counters").findOne({ name: "child" }))) {
    console.log("ASdasd");
    let counters = new mongoose.model("Counters")({
      name: "child",
    });
    await counters.save();
    counters = new mongoose.model("Counters")({
      name: "class",
    });
    await counters.save();
  }
})();
