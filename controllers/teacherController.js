const mongoose = require("mongoose");
const Teacher = mongoose.model("Teacher");
const Class = mongoose.model("Class");
module.exports.getAllTeachers = (request, response, next) => {
  Teacher.find()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

module.exports.getSingleTeacher = (request, response, next) => {
  Teacher.findOne({ _id: request.params.id })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};
module.exports.addTeacher = (request, response, next) => {
  let object = new Teacher(request.body);
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
module.exports.editTeacher = (request, response, next) => {
  Teacher.updateOne({ _id: request.body._id }, request.body)
    .then((data) => {
      response.status(200).json({ data: "edit  Teacher successfully..!" });
    })
    .catch((error) => next(error));
};
module.exports.deleteTeacher = (request, response, next) => {
  Teacher.deleteOne({ _id: request.body._id })
    .then((data) => {
      return Class.updateOne(
        { supervisor: request.body._id },
        { $set: { supervisor: null } }
      );
    })
    .then((data) => {
      response.status(200).json({ data: "deleted  Teacher successfully..!" });
    })
    .catch((error) => next(error));
};

module.exports.getSupervise = (request, response, next) => {
  Class.aggregate([
    {
      $lookup: {
        from: Teacher.collection.name,
        localField: "supervisor",
        foreignField: "_id",
        as: "supervisor",
      },
    },
    { $unwind: { path: "$supervisor" } },
    {
      $project: { name: 1, supervisor: 1 },
    },
  ])
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
  // Class.findOne({ _id: 2 }, { supervisor: 1 })
  //   .then((data) => {
  //     return Teacher.findOne({ _id: data.supervisor });
  //   })
  //   .then((data) => {
  //     console.log(data);
  //     response.status(200).json(data);
  //   })
  //   .catch((error) => next(error));
};
