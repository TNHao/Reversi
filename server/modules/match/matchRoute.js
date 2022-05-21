const express = require("express");
const matchController = require("./matchController");

const matchRoute = new express.Router();

matchRoute.get("/", matchController.getAll);
matchRoute.post("/player", matchController.getAllByPlayer);
matchRoute.post("/findId", matchController.findOneById);
matchRoute.post("/add", matchController.addOne);

module.exports = matchRoute;
