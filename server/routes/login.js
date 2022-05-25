const loginController = require('../controllers/login');
const loginRouter = require('express').Router();

loginRouter.post('/', loginController.logIn);

module.exports = loginRouter;
