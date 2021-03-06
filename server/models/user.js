const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  displayName: { type: String, required: false },
  avatarUrl: { type: String, required: false },
  email: { type: String, required: true },
  username: { type: String, required: true },
  name: String,
  passwordHash: String,
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;

    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
