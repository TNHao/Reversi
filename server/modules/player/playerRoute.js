const express = require('express');
const playerController = require('./playerController');

const playerRoute = new express.Router();

playerRoute.get('/', playerController.getAll);

module.exports = playerRoute;
