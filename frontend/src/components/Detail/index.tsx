import React, { useContext } from 'react'
import { MdClear } from 'react-icons/md'
import { backdrop_url } from '../../services/Api'
import Movie from '../../models/Movie'
import { MoviesContext } from '../../contexts/movies'

import './styles.css'
import { IconButton } from '@material-ui/core'

interface Props {
  movie: Movie
}

const Detail: React.FC<Props> = ({ movie }) => {
  console.log(movie)
  const { setActiveDetail } = useContext(MoviesContext)

  return (
    <div className="container">
      <div className="background">
        <div className="vignette"></div>
        <div className="background-image" style={{ backgroundImage: `url(${backdrop_url + movie.backdropPath})` }}></div>
      </div>
      <div className='details-content'>
        <div className='details-info'>
          <h1 style={{ color: '#6C63FF' }}>{movie.title}</h1>
          <p>{movie.overview ? movie.overview : 'Descrição não encontrada.'}</p>
          <span><strong>Média do TMDB: </strong>{movie.voteAverage}</span>
        </div>
        <IconButton onClick={() => setActiveDetail(null)}>
          <MdClear />
        </IconButton>
      </div>
    </div>
  )
}

export default Detail