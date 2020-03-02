import React from 'react';
import { IconButton } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { backdrop_url } from '../../services/Api';

import './Details.css';

export default ({ movie, close }) => {

  return (
    <div className='details-background' style={{backgroundImage: `url(${backdrop_url + movie.backdrop_path})`}}>
      <div className='details-content'>
        <div className='details-info'>
          <h1 style={{color: '#6C63FF'}}>{movie.title}</h1>
          <p>{movie.overview ? movie.overview : 'Descrição não encontrada.' }</p>
          <span><strong>Média do TMDB: </strong>{movie.vote_average}</span>
        </div>
        <IconButton onClick={close}>
          <Clear /> 
        </IconButton>
      </div>
    </div>
  );
}