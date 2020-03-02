import React, { useState, useEffect } from 'react';
import Api from '../../services/Api' ;
import { getUserId } from '../../services/Auth';
import Toolbar from '../../components/Toolbar/Toolbar';
import Listagem from './Listagem/Listagem';
import './Dashboard.css';

export default props => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    function findGenres() {
      let gen = [];
      movies.forEach( mov => {
        gen = gen.concat(mov["genres"].filter( item => !gen.includes(item)))
      })

      setGenres(gen);
    }

    findGenres();
  }, [movies])


  useEffect(() => {
    async function fetchData() {

      const response = await Api.get(`/film/recommendation/${getUserId()}`);

      setMovies(response.data.movies);
    }
    fetchData();
  }, [])

  return (
    <div className="dashboard">
      <Toolbar history={props.history}/>
      {genres.map( genre => (
        <div key={genre}>
          <h3>Filmes do gênero <span style={{color: '#6C63FF'}}>{genre}</span></h3>
          <Listagem movies={movies.filter( mov => mov["genres"].includes(genre))}/>
        </div>
      ))}
    </div>
  )
}