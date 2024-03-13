const { Router } = require("express");
const routes = Router();
const AuthController = require("../controllers/authController.js");

routes.post("/register", AuthController.register);

routes.post("/login", AuthController.login);

module.exports = routes;
