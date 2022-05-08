const authenticationRouter = require('express').Router();

authenticationRouter.get('/', async (req, res) => {
  if (!req.body.user) {
    return res.status(400).json({ error: 'authentication failed' });
  }
  res
    .status(200)
    .json({ message: 'authentication success', user: req.body.user });
});

module.exports = authenticationRouter;
