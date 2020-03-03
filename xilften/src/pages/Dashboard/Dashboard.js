import React, { useEffect } from 'react';
import Api from '../../services/Api' ;
import Toolbar from '../../components/Toolbar/Toolbar';
import Listagem from './Listagem/Listagem';
import { useSelector, useDispatch } from 'react-redux';
import { changeMoviesList } from '../../store/actions/movieActions';

import './Dashboard.css';

export default props => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { genres } = user;

  useEffect(() => {
    async function fetchData() {

      const response = await Api.get(`/film/recommendation/${user._id}`);

      genres.forEach( genre => {
        const movies = response.data.movies.filter( movie => movie.genres.includes(genre));
        dispatch(changeMoviesList(genre, movies));
      })
    }
    fetchData();
  }, [])

  return (
    <div className="dashboard">
      <Toolbar history={props.history}/>
      {genres.map( genre => (
        <div key={genre}>
          <h3>Filmes do gênero <span style={{color: '#6C63FF'}}>{genre}</span></h3>
          <Listagem genre={genre}/>
        </div>
      ))}
    </div>
  )
}