import React from 'react'
import { useAuth } from '../../contexts/auth'
import User from '../../models/User'
import { MoviesProvider } from '../../contexts/movies'

import Toolbar from '../../components/Toolbar'
import HorizontalList from '../../components/HorizontalList'

import './styles.css'


const Home: React.FC = () => {
  const { user } = useAuth()
  const userActive = user as User

  return (
    <div className="dashboard">
      <Toolbar />
      <MoviesProvider>
        {userActive.genres.map(genre => {
          return (
            <HorizontalList key={genre} genre={genre} />
          )
        })}
      </MoviesProvider>
    </div>
  )
}

export default Home