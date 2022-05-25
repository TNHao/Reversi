const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  playerOne: { type: Object, required: true },
  playerTwo: { type: Object, required: true },
  result: { type: Number, required: true },
  moveHistory: { type: [String] },
  timeStart: { type: Date, default: Date.now },
  timeEnd: { type: Date, default: Date.now },
});

matchSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;
