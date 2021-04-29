const User = require("../models/auth.models.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
exports.register = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  let password1 = req.body.password.toString();
  const newUser = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: bcrypt.hashSync(password1, 8),
  });
  console.log(typeof req.body.password);
  User.register(newUser, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while Registration.",
      });
    else res.send(data);
  });
};
