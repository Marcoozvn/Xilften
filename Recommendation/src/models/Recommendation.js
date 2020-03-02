const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    unique: true
  },
  movies: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Film'
    }
  ]
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);