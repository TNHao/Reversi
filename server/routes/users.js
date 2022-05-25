const usersController = require('../controllers/users');
const usersRouter = require('express').Router();

userRouter.get('/', usersController.getAll);
userRouter.get('/:username', usersController.getByUsername);
userRouter.post('/', usersController.addNew);
userRouter.put('/', usersController.updateByUsername);

module.exports = usersRouter;
