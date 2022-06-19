const Match = require('../models/match');
const User = require('../models/user');
module.exports = {
  createMatch: async (req, res) => {
    const { playerOne, playerTwo } = req.body;

    const newMatch = new Match({ playerOne, playerTwo });
    const savedMatch = await newMatch.save();

    res.status(200).json(savedMatch);
  },

  updateMatch: async (req, res) => {
    const {
      id,
      playerOne,
      playerTwo,
      result,
      moveHistory,
      timeStart,
      timeEnd,
    } = req.body;

    const match = await Match.findById(id);
    if (match == null) {
      return res.status(404).json({ message: 'Match doesnt exist' });
    }

    const updatedMatch = await Match.findByIdAndUpdate(
      {
        playerOne,
        playerTwo,
        result,
        moveHistory,
        timeStart,
        timeEnd,
      },
      {
        new: true,
        runValidators: true,
        context: 'query',
      }
    );
    res.json(updatedMatch);
  },

  getUserMatches: async (req, res) => {
    const { username } = req.body.params;
    const user = await findOne({ username });
    if (user == null) {
      return res.status(404).json({ message: 'User doesnt exists' });
    }
    const allMatch = await Match.find({
      $or: [
        { 'playerOne.id': { $eq: user.id } },
        { 'playerTwo.id': { $eq: user.id } },
      ],
    });

    return res.status(200).json(allMatch);
  },
};
