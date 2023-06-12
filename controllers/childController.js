const mongoose = require("mongoose");
const Child = mongoose.model("Child");
const Class = mongoose.model("Class");
const Teacher = mongoose.model("Teacher");
module.exports.getAllChildren = (request, response, next) => {
  Child.find()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

module.exports.getSingleChild = (request, response, next) => {
  Child.findOne({ _id: request.params.id })
    .then((data) => {
      data && response.status(200).json(data);
      throw new Error("Wrong ID..!");
    })
    .catch((error) => next(error));
};
module.exports.addChild = (request, response, next) => {
  let object = new Child(
    //   _id: request.body._id,
    //   fullName: request.body.fullName,
    //   age: request.body.age,
    //   level: request.body.level,
    //   address: {
    //     city: request.body.address.city,
    //     street: request.body.address.street,
    //     building: request.body.address.building,
    //   },
    request.body
  );
  object
    .save()
    .then((data) => {
      response.status(201).json(data);
    })
    .catch((error) => {
      console.log("sadasdas");
      next(error);
    });
};
module.exports.editChild = (request, response, next) => {
  Child.updateOne({ _id: request.body._id }, request.body)
    .then((data) => {
      response.status(200).json({ data: "edit  child successfully..!" });
    })
    .catch((error) => next(error));
};
module.exports.deleteChild = (request, response, next) => {
  Child.deleteOne({ _id: request.body._id })
    .then((data) => {
      return Class.updateOne(
        { children: request.body._id },
        { $pull: { children: request.body._id } }
      );
    })
    .then((data) => {
      response.status(200).json({ data: "deleted  child successfully..!" });
    })
    .catch((error) => next(error));
};
module.exports.getChildClass = (request, response, next) => {
  Class.aggregate([
    {
      $match: { children: Number(request.params.id) },
    },
    {
      $lookup: {
        from: Child.collection.name,
        foreignField: "_id",
        localField: "children",
        as: "children",
      },
    },
    {
      $lookup: {
        from: Teacher.collection.name,
        foreignField: "_id",
        localField: "supervisor",
        as: "supervisor",
      },
    },
    { $unwind: { path: "$supervisor" } },
    // { $unwind: { path: "$childClass" } },
    // {
    //   $project: { children: 1 },
    // },
  ])
    // Class.findOne({ children: request.params.id })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};
