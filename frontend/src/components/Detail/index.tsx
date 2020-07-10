import React, { useState } from 'react'
import Movie from '../../models/Movie'
import DetailOverview from '../DetailOverview'
import DetailTrailer from '../DetailTrailer'

import './styles.css'

interface Props {
  movie: Movie
}

const Detail: React.FC<Props> = ({ movie }) => {
  const [page, setPage] = useState('overview')

  return (
    <div className="container">
      {page === 'overview' ? <DetailOverview movie={movie} /> : <DetailTrailer movie={movie} />}
      {movie.trailerUrl &&
        <div className="details-menu">
          <div className={`details-menu-item ${page === 'overview' ? 'active' : ''}`} onClick={() => setPage('overview')}>
            <strong>Overview</strong>
          </div>
          <div className={`details-menu-item ${page === 'trailer' ? 'active' : ''}`} onClick={() => setPage('trailer')}>
            <strong>Trailer</strong>
          </div>
        </div>
      }
    </div>
  )
}

export default Detail