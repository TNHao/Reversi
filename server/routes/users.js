const usersController = require('../controllers/users');
const usersRouter = require('express').Router();

usersRouter.get('/', usersController.getAll);
usersRouter.get('/:username', usersController.getByUsername);
usersRouter.post('/', usersController.addNew);
usersRouter.put('/', usersController.updateByUsername);

module.exports = usersRouter;
