const express = require('express');
const app = express();
const http = require('http');

require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');

const middleware = require('./utils/middleware');

const config = require('./utils/config');
const logger = require('./utils/logger');
const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const roomsRouter = require('./routes/rooms');
const socketRouter = require('./routes/socket');
const SocketServices = require('./services/socket');
const server = http.createServer(app);
const io = require('socket.io')(server);
global._baseDir = __dirname;
global._io = io;
//const authenticationRouter = require('./controllers/authentication');

logger.info('Connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((err) => {
    logger.error('Error connecting to MongoDB', err.message);
  });

app.use(cors());
app.use(express.json());

// Request handling middleware
app.use(middleware.requestLogger);
app.use(middleware.getTokenFrom);
app.use(middleware.extractUserFromToken);

// Routing
app.use('/api/login', loginRouter);
app.use('/api/users/', middleware.checkLogin, usersRouter);
app.use('/api/room', middleware.checkLogin, roomsRouter);
app.use('/api/socket', socketRouter); // remove

global._io.on('connection', SocketServices.connection);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = { server, io };
