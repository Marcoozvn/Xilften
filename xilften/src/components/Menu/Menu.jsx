import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeUser, changeToken } from '../../store/actions/userActions';
import { changeMoviesList, changeMoviesDetails, changeMoviesOffset, changeMoviesPerPage } from '../../store/actions/movieActions';

import './Menu.css';

export default ({ history }) => {
  const [active, setActive] = useState(false);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const genres = ['Comedy', 'Thriller', 'Horror', 'Crime', 'Drama', 'Adventure', 'Musical', 'Fantasy', 'Animation', 'Romance', 'Action',
  'Sci-Fi', 'Children', 'War'];

  function logOut() {
    dispatch(changeUser(null));
    dispatch(changeToken(null));
    genres.forEach(genre => {
      dispatch(changeMoviesList(genre, []));
      dispatch(changeMoviesDetails(genre, null));
      dispatch(changeMoviesOffset(genre, 0));  
      dispatch(changeMoviesPerPage(genre, []));
    })
    history.push('/');
  }

  function openProfile() {
    history.push('/profile');
  }

  return (
    <div 
      className={active ? 'dropdown-active' : 'dropdown'} 
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      >
      <div className='menu-container'>
        <img src={user.avatar} alt={user.name}/>
        <strong>Minha Conta</strong>
      </div>
      <div className='dropdown-content'>
        <span className='menu-item'>Logado como <strong style={{color: '#6C63FF'}}>{user.name}</strong></span>
        <hr/>
        <span className='menu-item' onClick={openProfile}>Perfil</span>
        <span className='menu-item' onClick={logOut}>Sair</span>
      </div>
    </div>
  )
}