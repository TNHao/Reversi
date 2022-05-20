const mongoose = require('mongoose');
// const { Schema } = mongoose;

const playerSchema = new mongoose.Schema({
    displayName: { type: String, required: true },
    avatarUrl: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
});

playerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;