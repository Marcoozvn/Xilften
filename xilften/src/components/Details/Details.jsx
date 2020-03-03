import React from 'react';
import { IconButton } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { backdrop_url } from '../../services/Api';
import { useSelector, useDispatch } from 'react-redux';
import { changeMoviesDetails } from '../../store/actions/movieActions';

import './Details.css';

export default ({ genre }) => {
  const movie = useSelector(state => state.movies[genre].details);
  const dispatch = useDispatch();

  return (
    <div className='details-background' style={{backgroundImage: `url(${backdrop_url + movie.backdrop_path})`}}>
      <div className='details-content'>
        <div className='details-info'>
          <h1 style={{color: '#6C63FF'}}>{movie.title}</h1>
          <p>{movie.overview ? movie.overview : 'Descrição não encontrada.' }</p>
          <span><strong>Média do TMDB: </strong>{movie.vote_average}</span>
        </div>
        <IconButton onClick={() => dispatch(changeMoviesDetails(genre, null))}>
          <Clear /> 
        </IconButton>
      </div>
    </div>
  );
}