import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeUser, changeToken } from '../../store/actions/userActions';

import './Menu.css';

export default ({ history }) => {
  const [active, setActive] = useState(false);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  function logOut() {
    dispatch(changeUser(null));
    dispatch(changeToken(null));
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