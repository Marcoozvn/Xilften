const Recommendation = require('../models/recommendation.model');
const Movie = require('../models/film.model');

exports.getRecommendation = async (userId) => {
  console.log(userId);
  const recommendation = await Recommendation.findOne({user: userId}).populate('movies');

  if (recommendation) {
    return recommendation;
  }
  
  return Movie.find({}).limit(100);
}
