const Film = require('../models/film.model');
const CSV = require('csvtojson');
const Recommendation = require('./recommendation.controller');
const Api = require('../services/Api');

exports.getRecommendation = async (req, res) => {
    const { userId } = req.params;

    let recommendation = await Recommendation.getRecommendation(userId);

    return res.status(200).send(recommendation);
}


exports.getAllFilms = async(req, res) => {
    
    try {
        let allFilms = await Film.find({});

        if(!allFilms)
            return res.status(400).send({error: 'Não foi possivel recuperar os filmes.'})

        return res.status(200).send({films: allFilms});
    } catch (err) {
        return res.status(500).send({error: 'Não foi possivel recuperar os filmes.'})
    }
}

exports.getByGenre = async (req, res) => {

    try {
        let films = await Film.find({genres: {$in: [req.params.genre]}});

        if (!films)
            return res.status(400).send({error: 'Não foi possível recuperar os filmes.'})
    
        return res.status(200).send({films: films});
    } catch (err) {
        return res.status(500).send({error: 'Não foi possível recuperar os filmes.'})
    }
}

exports.getByYear = async (req, res) => {
    try {
        let films = await Film.find({year: req.params.year});

        if (!films)
            return res.status(400).send({error: 'Não foi possível recuperar os filmes.'})
    
        return res.status(200).send({films: films});
    } catch (err) {
        return res.status(500).send({error: 'Não foi possível recuperar os filmes.'})
    }
}

exports.getByTitle = async (req, res) => {
    try {
        let films = await Film.find({title: {$regex: req.params.title, $options: "$i"}});

        if (!films)
            return res.status(400).send({error: 'Não foi possível recuperar os filmes.'})
    
        return res.status(200).send({films: films});
    } catch (err) {
        return res.status(500).send({error: 'Não foi possível recuperar os filmes.'})
    }
}

exports.loadFromCSV = async (req, res) => {
    const csvFilePath = './data/movies.csv';
    const jsonArray = await CSV().fromFile(csvFilePath);

    const linksPath = './data/links.csv';
    const jsonLinksArray = await  CSV().fromFile(linksPath);

    console.log(jsonLinksArray[1], jsonArray[1]);

    for (let index = 0; index < jsonArray.length; index++) {
        let movie = jsonArray[index];
        let links = jsonLinksArray[index];
        try {
            const { movieId } = movie;
            const genres = movie.genres.replace('(no genres listed)', '').split('|');

            const { data: { poster_path, backdrop_path, overview, title, vote_average, release_date } } =  await Api.tmdb_api.get(`/movie/${links.tmdbId}?api_key=${Api.api_key}&language=pt-BR`);

            const mov = new Film({
                movieId,
                title,
                year: release_date,
                genres,
                imdbId: links.imdbId,
                tmdbId: links.tmdbId,
                poster_path,
                backdrop_path,
                overview,
                vote_average
            });

            await mov.save();
            console.log(`Filme fake nº ${movieId} cadastrado com sucesso`);
        } catch (e) {
            console.log(e);
        }
    }

    return res.status(200).send('Filmes Cadastrados');
};

module.exports = exports;
