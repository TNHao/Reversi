const Room = require('../models/room');

module.exports = {
  createRoom: async (req, res) => {
    const {
      username,
      mapSize,
      diffNumChessSetting,
      minChess,
      maxTimeOutTimes,
      maxTimeOut,
      turnTime,
    } = req.body;
    const roomResult = await Room.findOne({
      'players[0]': `${masterUsername}`,
    });

    if (roomResult === null) {
      const newRoom = new Room({
        players: [`${username}`],
        mapSize,
        diffNumChessSetting,
        minChess,
        maxTimeOutTimes,
        maxTimeOut,
        turnTime,
      });
      const savedRoom = await newRoom.save();
      return res.status(200).json(savedRoom);
    }

    res.status(400).json({ error: 'You already create your room' });
  },

  getAll: async (req, res) => {
    const roomList = await Room.find({});
    res.json(roomList);
  },

  getRoomByMasterUsername: async (req, res) => {
    const masterUsername = req.params.masterUsername;
    const roomResult = await Room.findOne({
      'players[0]': `${masterUsername}`,
    });
    res.json(roomResult);
  },

  updateRoom: async (req, res) => {
    const {
      players,
      mapSize,
      diffNumChessSetting,
      minChess,
      maxTimeOutTimes,
      maxTimeOut,
      turnTime,
    } = req.body;

    const roomResult = await Room.findOne({
      'players[0]': `${players[0]}`,
    });

    if (roomResult !== null) {
      const updatedRoom = await User.findByIdAndUpdate(
        roomResult.id,
        {
          players,
          mapSize,
          diffNumChessSetting,
          minChess,
          maxTimeOutTimes,
          maxTimeOut,
          turnTime,
        },
        {
          new: true,
          runValidators: true,
          context: 'query',
        }
      );
      return res.status(200).json(updatedRoom);
    }

    res.status(400).json({ error: 'Room doesnt exist' });
  },

  deleteRoomByMasterUsername: async (req, res) => {
    const { masterUsername } = req.body;
    const roomResult = await Room.findOne({
      'players[0]': `${masterUsername}`,
    });

    if (roomResult !== null) {
      await Room.findByIdAndDelete(roomResult.id);
      return res
        .status(204)
        .send({ message: `Successfully deleted room of : ${masterUsername}` });
    }

    res.status(400).json({ message: 'Room doesnt exist' });
  },
};
