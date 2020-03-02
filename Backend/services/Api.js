const axios = require("axios");

exports.tmdb_api = axios.create({
  baseURL: "https://api.themoviedb.org/3"
});

exports.api_key = "84ff829e533f00dd6091b6cc37dccd3a";

exports.poster_url = "https://image.tmdb.org/t/p/w154";
exports.backdrop_url = "https://image.tmdb.org/t/p/w1280";

module.export = exports;