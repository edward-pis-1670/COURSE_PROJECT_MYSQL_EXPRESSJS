module.exports = (app) => {
  const course = require("../controllers/course.controller.js");

  // Create a new Course
  app.post("/courses/create", course.create);

  // Retrieve a single Course with CourseId
  app.get("/courses/:CourseId", course.findOne);

  // Retrieve all Course
  app.get("/courses", course.findAll);

  // Update a Course with CourseId
  app.put("/courses/update/:CourseId", course.update);

  // Delete a Course with CourseId
  app.delete("/courses/delete/:CourseId", course.delete);

  // Delete all Courses
  app.delete("/courses/deleteAll", course.deleteAll);
};
