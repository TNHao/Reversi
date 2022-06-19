const roomsController = require('../controllers/rooms');
const roomsRouter = require('express').Router();

roomsRouter.get('/', roomsController.getAll);
roomsRouter.post('/', roomsController.createRoom);
roomsRouter.put('/', roomsController.updateRoom);
roomsRouter.delete('/', roomsController.deleteRoomByMasterUsername);
roomsRouter.get('/:masterUsername', roomsController.getRoomByMasterUsername);

module.exports = roomsRouter;
