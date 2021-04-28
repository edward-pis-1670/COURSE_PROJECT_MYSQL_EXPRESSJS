const Course = require("../models/course.models.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Course
  const course = new Course({
    CourseTitle: req.body.CourseTitle,
    AuthorId: req.body.AuthorId,
    Description: req.body.Description,
    Price: req.body.Price,
    CategoryId: req.body.CategoryId,
  });

  // Save Course in the database
  Course.create(course, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Course.",
      });
    else res.send(data);
  });
};

// Find a single Course with a CourseId
exports.findOne = (req, res) => {
  Course.findById(req.params.CourseId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Course with id ${req.params.CourseId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Course with id " + req.params.CourseId,
        });
      }
    } else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Course.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving courses.",
      });
    else res.send(data);
  });
};
// Update a Course identified by the CourseId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Course.updateById(req.params.CourseId, new Course(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Course with id ${req.params.CourseId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Course with CourseId " + req.params.CourseId,
        });
      }
    } else res.send(data);
  });
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Course.remove(req.params.CourseId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Course with id ${req.params.CourseId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Course with id " + req.params.CourseId,
        });
      }
    } else res.send({ message: `Course was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Course.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all courses.",
      });
    else res.send({ message: `All Courses were deleted successfully!` });
  });
};
