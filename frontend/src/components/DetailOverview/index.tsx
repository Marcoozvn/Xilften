import React, { useContext } from 'react'
import { MdClear } from 'react-icons/md'
import { backdrop_url } from '../../services/Api'
import Movie from '../../models/Movie'
import { MoviesContext } from '../../contexts/movies'
import { IconButton } from '@material-ui/core'

import './styles.css'

interface Props {
  movie: Movie
}

const DetailOverview: React.FC<Props> = ({ movie }) => {
  const { setActiveDetail } = useContext(MoviesContext)

  function voteAverageColor(voteAverage: number) {
    const colors = ['#eb7070', '#fec771', '#e6e56c', '#64e291']

    return colors[Math.floor(voteAverage / 2.5)]
  }

  return (
    <>
      <div className="background">
        <div className="vignette"></div>
        <div className="background-image" style={{ backgroundImage: `url(${backdrop_url + movie.backdropPath})` }}></div>
      </div>
      <div className='details-content'>
        <div className='details-info'>
          <h1 style={{ color: '#6C63FF' }}>{movie.title}</h1>
          <p>
            <strong>Enredo: </strong>
            <span className="text-value">{movie.overview ? movie.overview : 'Descrição não encontrada.'}</span>
          </p>
          <div>
            <strong>Média do TMDB: </strong>
            <span style={{ color: voteAverageColor(movie.voteAverage) }}>{movie.voteAverage}</span>
          </div>
        </div>
        <IconButton onClick={() => setActiveDetail(null)}>
          <MdClear />
        </IconButton>
      </div>
    </>
  )
}

export default DetailOverview