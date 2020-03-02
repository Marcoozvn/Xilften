import React from 'react';
import StarRatings from 'react-star-ratings';
import { IconButton } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import Api, { poster_url } from '../../services/Api';
import { getUserId } from '../../services/Auth';
import { Tooltip } from '@material-ui/core';

import './Card.css';

export default ({ movie, hideFilm }) => {
  let rating = 0

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
  //backgroundImage: `url(${poster_url + movie.poster_path})`
  return (
    <div className="card" > 
      <div style={{ flex: 1, width: '100%'}}>
        <header>
          <div></div>
          <Tooltip title='Não interessa' placement='top'>
            <IconButton 
            onClick={notInterested}
            >
              <Clear />
            </IconButton>
          </Tooltip>
        </header>    
      </div>
      <StarRatings
        rating={rating}
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