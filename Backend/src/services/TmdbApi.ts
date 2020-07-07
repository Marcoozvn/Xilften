import axios from 'axios'

const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
})

const apiKey = process.env.TMDB_API_KEY
const posterUrl = 'https://image.tmdb.org/t/p/w154'
const backdropUrl = 'https://image.tmdb.org/t/p/w1280'

export { tmdbApi, apiKey, posterUrl, backdropUrl }
