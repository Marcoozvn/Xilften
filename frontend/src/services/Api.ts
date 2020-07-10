import axios from "axios"

const api = axios.create({
  baseURL: 'https://xilften-backend.herokuapp.com/'
})

export const tmdb_api = axios.create({
  baseURL: "https://api.themoviedb.org/3"
})

export const api_key = "84ff829e533f00dd6091b6cc37dccd3a"

export const poster_url = "https://image.tmdb.org/t/p/w154"
export const backdrop_url = "https://image.tmdb.org/t/p/w780"

export default api