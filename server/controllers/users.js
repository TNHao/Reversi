const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

usersRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

usersRouter.get('/:username', async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  res.json(user);
});

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body;
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).json({ error: 'Username must be unique' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await newUser.save();

  res.status(200).json(savedUser);
});

usersRouter.put('/', async (req, res) => {
  const { username, name, password } = req.body;

  const existingUser = await User.findOne({ username });

  if (!existingUser) {
    return res.status(400).json({ error: 'User doesnt exist' });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const id = existingUser.id;

  const updateUser = await User.findByIdAndUpdate(
    id,
    {
      username,
      name,
      passwordHash,
    },
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  );

  res.json(updateUser);
});

module.exports = usersRouter;
