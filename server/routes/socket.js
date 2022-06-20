const socketRouter = require('express').Router();
const socketController = require('../controllers/socket');
const socket = require('../services/socket');

socketRouter.get('/', socketController.connection);
socketRouter.post('/move', socketController.move);
socketRouter.post('/swapTurn', socketController.swapTurn);
socketRouter.post('/pauseReq', socketController.pauseReq);
socketRouter.post('/pauseRes', socketController.pauseRes);
socketRouter.post('/swap', socketController.swapTurn);
module.exports = socketRouter;
