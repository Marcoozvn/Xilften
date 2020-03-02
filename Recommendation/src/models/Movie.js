const mongoose = require('mongoose');

let FilmSchema = new mongoose.Schema({
    movieId: {
        type: Number,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    year: {
        type: Date
    },
    genres: [{
        type: String
    }],
    imdbId: {
        type: Number
    },
    tmdbId: {
        type: Number
    },
    poster_path: {
        type: String
    },
    backdrop_path: {
        type: String
    },
    overview: {
        type: String
    },
    vote_average: {
        type: Number
    }
});

module.exports = mongoose.model('Film', FilmSchema);
