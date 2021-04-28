const mysql = require("./db.js");

// constructor
const Course = function (course) {
  this.CourseTitle = course.CourseTitle;
  this.AuthorId = course.AuthorId;
  this.Description = course.Description;
  this.Price = course.Price;
  this.CategoryId = course.CategoryId;
};

Course.create = (newCourse, result) => {
  mysql.query("INSERT INTO hust.courses SET ?", newCourse, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created course: ", { CourseId: res.insertId, ...newCourse });
    result(null, { CourseId: res.insertId, ...newCourse });
  });
};

Course.findById = (CourseId, result) => {
  mysql.query(
    `SELECT * FROM hust.courses WHERE CourseId = ${CourseId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found course: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found Course with the CourseId
      result({ kind: "not_found" }, null);
    }
  );
};

Course.getAll = (result) => {
  mysql.query("SELECT * FROM hust.courses", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("courses: ", res);
    result(null, res);
  });
};

Course.updateById = (CourseId, course, result) => {
  mysql.query(
    "UPDATE hust.courses SET CourseTitle = ?, AuthorId = ?, Description = ?, Price = ?, CategoryId = ? WHERE CourseId = ?",
    [
      course.CourseTitle,
      course.AuthorId,
      course.Description,
      course.Price,
      course.CategoryId,
      CourseId,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Course with the CourseId
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated course: ", { CourseId: CourseId, ...course });
      result(null, { CourseId: CourseId, ...course });
    }
  );
};

Course.remove = (CourseId, result) => {
  mysql.query(
    "DELETE FROM hust.courses WHERE CourseId = ?",
    CourseId,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Course with the CourseId
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted course with CourseId: ", CourseId);
      result(null, res);
    }
  );

  Course.removeAll = (result) => {
    mysql.query("DELETE FROM hust.courses", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`deleted ${res.affectedRows} courses`);
      result(null, res);
    });
  };
};
module.exports = Course;
