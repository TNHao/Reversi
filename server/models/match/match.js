const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    playerOne: { type: String, required: true },
    playerTwo: { type: String, required: true },
    time: { type: Date, required: true },
    result: { type: Number, required: true },
    moveHistory: { type: Array, required: true },
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