const express = require("express");
const authenticationController = require("./authenticationController");
const loginController = require("./loginController");

const authenticationRoute = new express.Router();

authenticationRoute.get("/", authenticationController.authentication);
authenticationRoute.post("/login", loginController.login);

module.exports = authenticationRoute;
