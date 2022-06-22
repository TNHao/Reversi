const Match = require("../../models/match/match");

const getAll = async (req, res) => {
  const matchs = await Match.find({});
  res.status(200).json({ matchs });
};

const getAllByPlayer = async (req, res) => {
  const { id } = req.body;
  const matchsOne = await Match.find({ playerOne: id });
  const matchsTwo = await Match.find({ playerTwo: id });
  const matchs = matchsTwo.concat(matchsOne);
  res.status(200).json({ matchs });
};

const findOneById = async (req, res) => {
  const { id } = req.body;
  const match = await Match.findOne({ id: id });
  res.status(200).json({ match });
};

const addOne = async (req, res) => {
  const { playerOne, playerTwo, time, result, moveHistory } = req.body;

  const newMatch = new Match({
    playerOne,
    playerTwo,
    time,
    result,
    moveHistory,
  });

  await newMatch.save();

  res.status(200).json({ code: 200, status: "Success" });
};

module.exports = {
  getAll,
  getAllByPlayer,
  findOneById,
  addOne,
};
