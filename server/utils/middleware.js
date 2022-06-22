const User = require('../models/user');
const logger = require('./logger');
const jwt = require('jsonwebtoken');
const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  logger.info('Body:  ', req.body);
  logger.info('---');
  next();
};

const getTokenFrom = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.body.token = authorization.substring(7);
  }
  next();
};

const extractUserFromToken = async (req, res, next) => {
  if (req.body.token) {
    try {
      const verifiedToken = jwt.verify(req.body.token, process.env.SECRET);
      if (verifiedToken.id) {
        const user = await User.findById(verifiedToken.id);
        req.body.user = user;
      }
    } catch (error) {
      console.info('invalid token');
    }
  }
  next();
};

const userRequired = (req, res) => {
  res.status(401).send({ error: 'unauthorized' });
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  console.log(error.message);
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  getTokenFrom,
  extractUserFromToken,
};
