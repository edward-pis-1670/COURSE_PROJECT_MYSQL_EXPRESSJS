module.exports = (app) => {
  const user = require("../controllers/auth.controller.js");
  // Register with user
  app.post("/register", user.register);
};
