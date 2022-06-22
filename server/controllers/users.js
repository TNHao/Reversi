const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = {
  getAll: async (req, res) => {
    const users = await User.find({});
    res.json(users);
  },

  getByUsername: async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    res.json(user);
  },

  updateByUsername: async (req, res) => {
    const { username, password, displayName, avatarUrl, email } = req.body;

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
        displayName,
        passwordHash,
        email,
        avatarUrl,
      },
      {
        new: true,
        runValidators: true,
        context: 'query',
      }
    );

    res.json(updateUser);
  },

  addNew: async (req, res) => {
    const { username, password, displayName, avatarUrl, email } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username must be unique' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      displayName,
      passwordHash,
      email,
      avatarUrl,
    });

    const savedUser = await newUser.save();

    res.status(200).json(savedUser);
  },
};
