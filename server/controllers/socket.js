const SocketServices = require('../services/socket');
module.exports = {
  connection: async (req, res, next) => {
    return res.sendFile(_baseDir + '/index.html');
  },

  move: async (req, res, next) => {
    const { username, target, message } = req.body;
    const targetId = SocketServices.find(target);
    _io.to(targetId).emit('move', `${username} to ${target}: ${message}`);
    return res.status(200).json({ msg: 'success' });
  },

  swapTurn: async (req, res, next) => {
    const { target } = req.body;
    const targetId = SocketServices.find(target);
    _io.to(targetId).emit('swap');
    return res.status(200).json({ msg: 'turn ended' });
  },

  pauseReq: async (req, res, next) => {
    const { username, target } = req.body;
    const targetId = SocketServices.find(target);
    _io.to(targetId).emit('pauseReq', username);
    return res.status(200).json({ msg: 'Sended pause req' });
  },

  pauseRes: async (req, res, next) => {
    const { username, target, response } = req.body;
    const targetId = SocketServices.find(target);
    _io.to(targetId).emit('pauseRes', username + ' ' + response);
    return res.status(200).json({ msg: 'Sended pause res' });
  },
};
