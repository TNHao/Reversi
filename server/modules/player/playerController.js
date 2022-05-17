const player = require('../../models/player/player');

const getAll = async (req, res) => {
    console.log('get all players');
    const players = await player.find({});
    res.status(200).json({status});
};

module.exports = playerController = {
    getAll,
}
