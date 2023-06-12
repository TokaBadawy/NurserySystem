const mongoose = require("mongoose");
const Class = mongoose.model("Class");
const Teacher = mongoose.model("Teacher");
const Child = mongoose.model("Child");

module.exports.getAllClasses = (request, response, next) => {
  Class.find()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

module.exports.getSingleClass = (request, response, next) => {
  Class.findOne({ _id: request.params.id })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};
module.exports.addClass = (request, response, next) => {
  let object = new Class(request.body);
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
module.exports.editClass = (request, response, next) => {
  Class.updateOne({ _id: request.body._id }, request.body)
    .then((data) => {
      response.status(200).json({ data: "edit  child successfully..!" });
    })
    .catch((error) => next(error));
};
module.exports.deleteClass = (request, response, next) => {
  Class.deleteOne({ _id: request.body._id })
    .then((data) => {
      response.status(200).json({ data: "deleted  child successfully..!" });
    })
    .catch((error) => next(error));
};
module.exports.getClassChildInfo = (request, response, next) => {
  Class.aggregate([
    {
      $match: { _id: Number(request.params.id) },
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
      $project: { children: 1 },
    },
  ])
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

module.exports.getClassTeacherInfo = (request, response, next) => {
  Class.aggregate([
    {
      $match: { _id: Number(request.params.id) },
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
    {
      $project: { supervisor: 1 },
    },
  ])
    // Class.findOne({ children: request.params.id })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};
