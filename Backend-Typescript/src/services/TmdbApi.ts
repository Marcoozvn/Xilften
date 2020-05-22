import axios from 'axios'

const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
})

const apiKey = '84ff829e533f00dd6091b6cc37dccd3a'
const posterUrl = 'https://image.tmdb.org/t/p/w154'
const backdropUrl = 'https://image.tmdb.org/t/p/w1280'

export { tmdbApi, apiKey, posterUrl, backdropUrl }
