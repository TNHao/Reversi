const express = require('express');
const app = express();
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');

const middleware = require('./utils/middleware');

const config = require('./utils/config');
const logger = require('./utils/logger');

// const loginRouter = require('./controllers/login');
// const usersRouter = require('./controllers/users');
// const authenticationRouter = require('./controllers/authentication');
// const playerRoute = require('./modules/player/playerRoute');
// const matchRoute = require('./modules/match/matchRoute');
// const authenticationRoute = require('./modules/authentication/authenticationRoute');
const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const roomsRouter = require('./routes/rooms');

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
app.use("/api/player", playerRoute);
app.use("/api/match", matchRoute);
app.use('/api/login', loginRouter);

// app.use('/api/authentication', authenticationRoute);
// app.use('/api/users/', usersRouter);
app.use('/api/users/', usersRouter);
app.use('/api/room', roomsRouter);

// Error handling
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
