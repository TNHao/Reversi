const Player = require('../../models/player/player')
const bcrypt = require('bcrypt');

const getAll = async (req, res) => {
    const players = await Player.find({});
    res.status(200).json({players});
};

const findOneById = async (req, res) => {
    const { id } = req.body;
    const player = await Player.findOne({ id: id });
    res.status(200).json({player});
};

const findOneByUsername = async (req, res) => {
    const { username } = req.body;
    const player = await Player.findOne({ username });
    res.status(200).json({player});
};

const addOne = async (req, res) => {
    const { displayName, avatarUrl, email, username, password } = req.body;
    const existingPlayer = await Player.findOne({ username });

    if (existingPlayer) {
        return res.status(400).json({
            code: 400,
            status: "Fail",
            error: "Username must be existing!"
        });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newPlayer = new Player({
        displayName,
        avatarUrl,
        email,
        username,
        password: passwordHash,
    });

    await newPlayer.save();

    res.status(200).json({ code: 200, status: "Success"});
};

const updateOne = async (req, res) => {
    console.log(req.body);
    const { displayName, avatarUrl, email, username, password } = req.body;
    const existingPlayer = await Player.findOne({ username });

    if (!existingPlayer) {
        res.status(400).json({
            code: 400,
            status: "Fail",
            error: "Username doesn't existing!"
        });
        return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const updatePlayer = {
        displayName,
        avatarUrl,
        email,
        username,
        password: passwordHash,
    };

    await Player.findOneAndUpdate({ username }, { $set: updatePlayer });

    res.status(200).json({ code: 200, status: "Success"});
};

const deleteOne = async (req, res) => {
    console.log(req.body);
    const { username } = req.body;
    await Player.deleteOne({ username });
    res.status(200).json({ code: 200, status: "Success"});
};

module.exports = playerController = {
    getAll,
    findOneById,
    findOneByUsername,
    addOne,
    updateOne,
    deleteOne,
}
