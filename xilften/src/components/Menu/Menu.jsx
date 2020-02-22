import React, { useState } from 'react';
import { logout } from '../../services/Auth';

import './Menu.css';

export default ({ history }) => {
  const [active, setActive] = useState(false);

  function logOut() {
    logout();
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
        <img src={localStorage.getItem('AVATAR')} alt='Alt'/>
        <strong>Minha Conta</strong>
      </div>
      <div className='dropdown-content'>
        <span className='menu-item'>Logado como <strong style={{color: '#6C63FF'}}>{localStorage.getItem('USER_NAME')}</strong></span>
        <hr/>
        <span className='menu-item' onClick={openProfile}>Perfil</span>
        <span className='menu-item' onClick={logOut}>Sair</span>
      </div>
    </div>
  )
}