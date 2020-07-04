import React, { useEffect, useState, useContext } from 'react'
import Card from '../Card'
import SlideButton from '../SlideButton'
import useWindowDimensions from '../../assets/useWindowDimensions'
import Movie from '../../models/Movie'
import { MoviesContext } from '../../contexts/movies'
import Detail from '../../components/Detail'

import './styles.css'

interface Props {
  genre: string
}

const HorizontalList: React.FC<Props> = ({ genre }) => {
  const { movies: allMovies, activeDetail } = useContext(MoviesContext)
  const [movies, setMovies] = useState<Movie[]>([]);
  const { width } = useWindowDimensions()
  const perPage = Math.trunc(width / 150)

  const [offset, setOffset] = useState(0)
  const [moviesPerPage, setMoviesPerPage] = useState<Movie[]>([])

  useEffect(() => {
    const movs = allMovies.filter(movie => movie.genres.includes(genre))
    setMovies(movs)
  }, [allMovies, genre])

  useEffect(() => {
    setMoviesPerPage(movies.slice(offset, offset + perPage))
  }, [offset, movies, perPage])

  function previousPage() {
    let myOffset = offset
    if (myOffset > 0) {
      myOffset -= 1
    }

    setOffset(myOffset)
  }

  function nextPage() {
    let myOffset = offset
    if (myOffset < movies.length - 1) {
      myOffset += 1
    }

    setOffset(myOffset)
  }

  return (
    <>
      {movies.length > 0 &&
        <>
          <h3>Filmes do gênero <span style={{ color: '#6C63FF' }}>{genre}</span></h3>
          <div className="slider">
            {offset > 0 && <SlideButton onClick={previousPage} type="prev" />}
            <div className="slider-container">
              {moviesPerPage.map(mov => (
                <div className='wrap' key={mov._id}>
                  <Card movie={mov} genre={genre} />
                </div>
              ))}
            </div>
            {offset < movies.length - perPage + 1 && <SlideButton onClick={nextPage} type="next" />}
          </div>
          {activeDetail && activeDetail.genre === genre && <Detail movie={activeDetail.movie} />}
        </>
      }
    </>
  )
}

export default HorizontalList