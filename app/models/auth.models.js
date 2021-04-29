const mysql = require("./db.js");
// constructor
const User = function (user) {
  this.fullName = user.fullName;
  this.email = user.email;
  this.password = user.password;
};

User.register = (newUser, result) => {
  mysql.query("INSERT INTO hust.users SET ?", newUser, async (err, res) => {
    if (err) {
      console.log("error ", err);
      result(err, null);
      return;
    }
    result(null, {
      UserId: res.insertId,
      ...newUser,
    });
    console.log("created new user: ", { UserId: res.insertId, ...newUser });
  });
};
module.exports = User;
