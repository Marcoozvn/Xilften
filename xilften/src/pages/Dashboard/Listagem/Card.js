import React, { useState, useEffect } from 'react'
import { tmdb_api, api_key, poster_url } from '../../../services/Api'
import StarRatings from 'react-star-ratings'
import { IconButton } from '@material-ui/core'
import { Clear } from '@material-ui/icons'
import Api from '../../../services/Api'
import { getUserId } from '../../../services/Auth'

import './Card.css'

export default ({ movie, hideFilm }) => {
  let rating = 0
  const [poster, setPoster] = useState('')
  //const [overview, setOverview] = useState('')

  useEffect(() => {
    async function fetchData() {

      const response =  await tmdb_api.get(`/movie/${movie.tmdbId}?api_key=${api_key}&language=pt-BR`)

      const { data: { poster_path } } = response

      setPoster(poster_url + poster_path)
      //setOverview(response.data.overview)
    }
    
    fetchData()
  }, [])

  async function rate(rate, film) {

    const response = await Api.post('/rating', { userId: getUserId(), filmId: film._id, rate })

    if (response.statusText === "OK") {
      hideFilm(film);    
    }    
  }

  function notInterested() {
    hideFilm(movie)
  }

  function changeRating() {
    rate(rating, movie)
  }

  return (
    <div className="card" style={{ backgroundImage: `url(${poster})`}}> 
      <header>
        <div></div>
        <IconButton 
        onClick={notInterested}
        >
          <Clear />
        </IconButton>
      </header>    
      <StarRatings
        rating={rating}
        starRatedColor="yellow"
        starHoverColor="yellow"
        changeRating={changeRating}
        starDimension="25px"
        numberOfStars={5}
        name={movie._id}
      />
    </div>
  )
}