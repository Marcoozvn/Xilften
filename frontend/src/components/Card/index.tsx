import React, { useContext } from 'react'
import StarRatings from 'react-star-ratings'
import { MdClear } from 'react-icons/md'
import Api, { poster_url } from '../../services/Api'
import { useAuth } from '../../contexts/auth'
import { MoviesContext } from '../../contexts/movies'
import { Tooltip, IconButton } from '@material-ui/core'

import './styles.css'
import Movie from '../../models/Movie'
import User from '../../models/User'

interface Props {
  movie: Movie
  genre: string
}

const Card: React.FC<Props> = ({ movie, genre }) => {
  const { user } = useAuth()
  const activeUser = user as User
  const { activeDetail, setActiveDetail, movies, setMovies } = useContext(MoviesContext)

  function hideFilm(event?: React.MouseEvent<any, MouseEvent>) {
    if (event) event.stopPropagation()

    setMovies(movies.filter(elem => elem._id !== movie._id))
  }

  function openMovieDetails() {
    setActiveDetail({
      genre,
      movie
    })
  }

  async function changeRating(rating: number) {
    const response = await Api.post('/rating', { userId: activeUser._id, movieId: movie._id, rate: rating })

    if (response.statusText === "OK") {
      hideFilm()    
      
      if (activeDetail?.movie._id === movie._id) {
        setActiveDetail(null)
      }
    }   
  }

  return (
    <div className="card" > 
      <div style={{  flex: 1, width: '100%', backgroundImage: `url(${poster_url + movie.posterPath})`}} onClick={() => openMovieDetails()}>
        <header>
          <div></div>
          <Tooltip title='Não interessa' placement='top'>
            <IconButton onClick={hideFilm}>
              <MdClear />
            </IconButton>
          </Tooltip>
        </header>    
      </div>
      <StarRatings
        starRatedColor="yellow"
        starHoverColor="yellow"
        changeRating={changeRating}
        starDimension="15px"
        numberOfStars={5}
        name={movie._id}
      />
    </div>
  )
}

export default Card