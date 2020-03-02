const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String
  },
  genres: [String]
});

module.exports = mongoose.model('User', UserSchema);