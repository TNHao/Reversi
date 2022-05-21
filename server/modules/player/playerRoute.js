const express = require('express');
const playerController = require('./playerController');

const playerRoute = new express.Router();

playerRoute.get('/', playerController.getAll);
playerRoute.post('/findId', playerController.findOneById);
playerRoute.post('/findUsername', playerController.findOneByUsername);
playerRoute.post('/add', playerController.addOne);
playerRoute.post('/update', playerController.updateOne);
playerRoute.post('/delete', playerController.deleteOne);

module.exports = playerRoute;
