import React from 'react';
import StarRatings from 'react-star-ratings';
import { IconButton } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import Api, { poster_url } from '../../services/Api';
import { Tooltip } from '@material-ui/core';
import { changeMoviesList } from '../../store/actions/movieActions';
import { useSelector, useDispatch } from 'react-redux';

import './Card.css';

export default ({ movie, genre }) => {
  const movies = useSelector(state => state.movies[genre].list);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  let rating = 0

  async function rate(rate, film) {

    const response = await Api.post('/rating', { userId: user._id, filmId: film._id, rate })

    if (response.statusText === "OK") {
      hideFilm(film);    
    }    
  }

  function hideFilm(event) {
    event.stopPropagation();

    const newArr = movies.filter(elem => elem !== movie);

    dispatch(changeMoviesList(genre, newArr));
  }

  function changeRating() {
    rate(rating, movie)
  }
  //backgroundImage: `url(${poster_url + movie.poster_path})`,
  return (
    <div className="card" > 
      <div style={{  flex: 1, width: '100%'}}>
        <header>
          <div></div>
          <Tooltip title='Não interessa' placement='top'>
            <IconButton 
            onClick={hideFilm}
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