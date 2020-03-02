const Film = require('../models/Movie');
const User = require('../models/User');
const Recommendation = require('../models/Recommendation');
const mongoose = require('mongoose');

module.exports = {
  async getRecommendation(userId) {
    const user = await User.findOne({_id: userId});
    
    const result = await processRecommendation(user);

    const recommendation = {
      user,
      movies: result
    }

    const rec = await Recommendation.findOne({user: userId});

    if (rec) {
      Recommendation.updateOne({user: userId}, { movies: result });
    } else {
      Recommendation.create(recommendation);
    }
  }
}

processRecommendation = async (user) => {

  /*
      Dataset com:
      id_user1 : {
        id_film1 : 5,
        id_film2 : 3,
        id_film3 : 4
      },
      id_user2 : {
        ...
      },
      ...
      */
    let dataset = await makeDataset();
      
    const targetRatings = dataset[user._id];
    
    /*
    id_user1: similaridade,
    id_user2: similaridade,
    ...
    */
    let similarities = {}
    
    for (usId in dataset) {
      if (usId !== user._id) {
        let sim = await euclideanSimilarity(targetRatings, dataset[usId])
        similarities[usId] = sim;
      }
    }
    let similarUsers = await getMostSimilars(similarities, 5);
    let movies = await getMovies(similarUsers, dataset, targetRatings, user.genres);
    let recommendation = [];
    for (item in movies) {
      if (recommendation.length == 100) {
        return recommendation;
      }
      let movId = movies[item][0];
      let mov = await Film.findOne({_id: movId});
      recommendation.push(mov);
    }
    return recommendation;
  },

filterMovies = async (moviesIds, favGenres) => {
  const movies = moviesIds.map( mov => mongoose.Types.ObjectId.createFromHexString(mov))
  const res = await Film.find({_id: { $in: movies}});
  let mapping = {};
  
  res.map( movie => mapping[movie._id] = movie.genres );

  return moviesIds.filter( id => {
    const bool = favGenres.some( genre => mapping[id].includes(genre));
    return bool;
  });
}

getMovies = async (similarUsers, dataset, targetRatings, favGenres) => {
  let movies = [];
  for (let simUser in similarUsers) {
    for (mov in dataset[similarUsers[simUser][0]]) {
      //Exclui da recomendacao filmes ja avaliados pelo target e filmes que não são do gênero de interesse do
      if (!movies.includes(mov) && targetRatings && !targetRatings[mov]){
        movies.push(mov);
      }  
    }
  }
  movies = await filterMovies(movies, favGenres);
  // Calcula relevancia: rel = somatorio(avaliacao_do_usuario_x * similaridade_do_usuario_x)
  let moviesRelevances = []
  for (mov in movies) {
    let relevance = 0;
    for (let user in similarUsers) {
      let ratings = dataset[similarUsers[user][0]];
      let rate = ratings[movies[mov]];
      
      
      if (rate) {
        relevance += similarUsers[user][1] * rate;
      }            
    }

    if (relevance > 0.85) { 
      moviesRelevances.push([movies[mov], relevance]);
    }        
  }
  
  // Ordena por relevancia
  moviesRelevances.sort(function(first, second) {
    return second[1] - first[1];
  });
  
  return moviesRelevances;
},

getMostSimilars = (similarities, k) => {
  let items = Object.keys(similarities).map(function(key) {
    return [key, similarities[key]];
  });
  
  items.sort(function(first, second) {
    return second[1] - first[1];
  });
  
  return items.slice(0, k);
},

euclideanSimilarity = (targetRatings, otherUserRatings) => {
  let coef = 0;
  
  if (targetRatings && targetRatings.length == 0) {
    return 0;
  }
  
  for (let rating in targetRatings){
    if (rating in otherUserRatings){
      coef += Math.pow(targetRatings[rating] - otherUserRatings[rating], 2)
    } else {
      coef += Math.pow(targetRatings[rating], 2)
    }
  }
  
  return 1 / (1 + Math.sqrt(coef));
},

makeDataset = async () => {
  let dataset = {};
  let users = await User.aggregate([
    {
      $lookup:
      {
        from: 'ratings',
        localField: '_id',
        foreignField: 'userId',
        as: 'ratings'
      }
    }       
  ])
  for (user in users) {
    let ratings = users[user].ratings;
    let rating_dict = {}
    for (rat in ratings) {
      let filmId = ratings[rat].filmId;
      let rate = ratings[rat].rate;
      rating_dict[filmId] = rate;
    }
    dataset[users[user]._id] = rating_dict;
  }
  
  return dataset;
}