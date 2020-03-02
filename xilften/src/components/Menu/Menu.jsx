import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeUser, changeToken } from '../../store/actions/userActions';

import './Menu.css';

const Menu = ({ history, user }) => {
  const [active, setActive] = useState(false);

  function logOut() {
    changeUser(null);
    changeToken(null);
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
};

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => bindActionCreators({ changeUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Menu);