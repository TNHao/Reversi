const Player = require("../../models/player/player");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  const player = await Player.findOne({ username });

  const credentialCorrect =
    player === null
      ? false
      : await bcrypt.compare(password, player.passwordHash);

  if (!credentialCorrect) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const tokenUser = {
    username: player.username,
    id: player._id,
  };

  const token = jwt.sign(tokenUser, process.env.SECRET);

  res.status(200).send({
    token,
    displayName: player.displayName,
    avatarUrl: player.avatarUrl,
    username: player.username,
  });
};

module.exports = {
  login,
};
