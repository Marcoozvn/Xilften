import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import { IconButton } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import Api, { poster_url } from '../../services/Api';
import { Tooltip } from '@material-ui/core';
import { changeMoviesList, changeMoviesDetails } from '../../store/actions/movieActions';
import { useSelector, useDispatch } from 'react-redux';

import './Card.css';

export default ({ movie, genre }) => {
  const movies = useSelector(state => state.movies[genre].list);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  function hideFilm(event) {
    if (event) event.stopPropagation();

    const newArr = movies.filter(elem => elem !== movie);

    dispatch(changeMoviesList(genre, newArr));
  }

  function openMovieDetails(movie) {
    dispatch(changeMoviesDetails(genre, movie));
  }

  async function changeRating(rating, name) {
    const response = await Api.post('/rating', { userId: user._id, movieId: movie._id, rate: rating })

    if (response.statusText === "OK") {
      hideFilm();    
    }   
  }

  return (
    <div className="card" > 
      <div style={{  flex: 1, width: '100%', backgroundImage: `url(${poster_url + movie.posterPath})`}} onClick={() => openMovieDetails(movie)}>
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