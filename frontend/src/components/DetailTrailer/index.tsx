import React from 'react'
import Movie from '../../models/Movie'

import './styles.css'

interface Props {
  movie: Movie
}


const DetailTrailer: React.FC<Props> = ({ movie }) => {
  
  return (
    <>
      <div className="background">
        <div className="video-container" >
          <iframe title="trailer" width="100%" height="350" src={movie.trailerUrl} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
        </div>
        <div className="video-right">
          <h2>Já assistiu?</h2>
          <span>Não esquece de avaliar!</span>
        </div>
      </div>
      <div className='details-content'>

      </div>
    </>
  )
}

export default DetailTrailer