import React, { useState, useEffect } from 'react'
import Card from '../../../components/Card/Card'
import './Listagem.css'
import SlideButton from '../../../components/SlideButton/SlideButton'
import useWindowDimensions from '../../../assets/useWindowDimensions'

export default props => {
  const { width } = useWindowDimensions()
  const [movies, setMovies] = useState([])
  const [offset, setOffset] = useState(0)
  const [moviesPerPage, setMoviesPerPage] = useState([])
  const perPage = Math.trunc(width/200)


  useEffect(() => {
    setMoviesPerPage(movies.slice(offset, offset + perPage))

  }, [offset, movies, perPage])

  useEffect(() => {

    setMovies(props.movies)

  }, [props.movies])

  function previousPage() {
    let my_offset = offset
    if (my_offset > 0) {
      my_offset -= 1
    }

    setOffset(my_offset)
  }

  function nextPage() {
    let my_offset = offset
    if (my_offset < movies.length - 1) {
      my_offset += 1
    }

    setOffset(my_offset)
  }

  function hideFilm(film) {

    const newArr = movies.filter(elem => elem !== film)

    setMovies(newArr)
  }

  return (
    <div className="slider">
      {offset > 0 && <SlideButton onClick={previousPage} type="prev"/>}      
      <div className="slider-container">
        {movies.lenght}
        {moviesPerPage.map( mov => (
          <Card key={mov._id} movie={mov} hideFilm={hideFilm}/>
        ))}
      </div>
      {offset < movies.length - perPage + 1 && <SlideButton onClick={nextPage} type="next"/>}
    </div>
  )
}