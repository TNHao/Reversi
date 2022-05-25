const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  players: { type: [String], required: true },
  mapSize: { type: Number, default: 5 },
  diffNumChessSetting: {
    type: Object,
    default: {
      diffNum: false,
      player: 1,
    },
  },
  minChess: { type: Number, default: 0 },
  maxTimeOutTimes: { type: Number, default: 1 },
  maxTimeOut: { type: Number, default: 120 },
  turnTime: { type: Number, default: 60 },
});

roomSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Match = mongoose.model('Room', roomSchema);
module.exports = Match;
