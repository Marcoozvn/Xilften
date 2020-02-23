import axios from "axios"
import { getToken } from "./Auth"

const api = axios.create({
  baseURL: "http://localhost:3333"
})

export const tmdb_api = axios.create({
  baseURL: "https://api.themoviedb.org/3"
})

export const api_key = "84ff829e533f00dd6091b6cc37dccd3a"

export const poster_url = "https://image.tmdb.org/t/p/w154"
export const backdrop_url = "https://image.tmdb.org/t/p/w1280"

api.interceptors.request.use(async config => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api