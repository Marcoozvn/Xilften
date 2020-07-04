import React, { createContext, useState, useEffect } from 'react'
import Movie from '../models/Movie'
import ActiveDetail from '../models/ActiveDetail'
import { useAuth } from './auth'
import Recommendation from '../models/Recommendation'
import Api from '../services/Api'
import User from '../models/User'

interface MoviesContextData {
  movies: Movie[]
  setMovies: (movies: Movie[]) => void
  activeDetail: ActiveDetail | null
  setActiveDetail: (activeDetail: ActiveDetail | null) => void
}

interface Props {
  children: React.ReactNode
}

export const MoviesContext = createContext<MoviesContextData>({} as MoviesContextData)

export const MoviesProvider: React.FC<Props> = ({ children }) => {
  const { user } = useAuth()
  const userActive = user as User
  const [activeDetail, setActiveDetail] = useState<ActiveDetail | null>(null)
  const [movies, changeMovies] = useState<Movie[]>([])

  function setMovies(newMovies: Movie[]) {
    changeMovies(newMovies)
  }

  useEffect(() => {
    async function fetchData() {
      const response = await Api.get<Recommendation>(`/recommendation`)

      const movFilter = response.data.movies.filter(movie => movie.genres.some((genre) => userActive.genres.includes(genre)))

      changeMovies(movFilter)
    }

    fetchData()
  }, [userActive])

  return (
    <MoviesContext.Provider value={{ movies, setMovies, activeDetail, setActiveDetail }}>
      {children}
    </MoviesContext.Provider>
  )
}