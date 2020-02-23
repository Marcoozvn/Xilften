import React, { useEffect, useState } from 'react';
import { tmdb_api, api_key, backdrop_url } from '../../services/Api';
import { IconButton } from '@material-ui/core';
import { Clear } from '@material-ui/icons';

import './Details.css';

export default ({ movie, close }) => {
  const [backdrop, setBackdrop] = useState('');
  const [overview, setOverview] = useState('');
  const [title, setTitle] = useState('');
  const [voteAverage, setVoteAverage] = useState(0);

  useEffect(() => {
    async function fetchData() {

      const response =  await tmdb_api.get(`/movie/${movie.tmdbId}?api_key=${api_key}&language=pt-BR`);

      console.log(response);
      const { data: { backdrop_path, overview, title, vote_average } } = response;

      setBackdrop(backdrop_url + backdrop_path);
      setOverview(overview);
      setTitle(title);
      setVoteAverage(vote_average);
    }
    
    fetchData()
  }, [movie])

  return (
    <div className='details-background' style={{backgroundImage: `url(${backdrop})`}}>
      <div className='details-content'>
        <div className='details-info'>
          <h1 style={{color: '#6C63FF'}}>{title}</h1>
          <p>{overview }</p>
          <span><strong>Média do TMDB: </strong>{voteAverage}</span>
        </div>
        <div className='details-close'>
          <div></div>
          <IconButton onClick={close} edgeEnd>
            <Clear />
          </IconButton>
        </div>
      </div>
    </div>
  );
}