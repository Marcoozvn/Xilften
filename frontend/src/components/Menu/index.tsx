import React, { useState } from 'react'
import { useAuth } from '../../contexts/auth'
import { useHistory } from 'react-router-dom'

import './styles.css'
import User from '../../models/User'

export default () => {
  const [active, setActive] = useState(false)
  const { user, signOut } = useAuth()
  const history = useHistory()

  const userActive = user as User

  function logOut() {
    signOut()
  }

  function openProfile() {
    history.push('/profile')
  }

  return (
    <div 
      className={active ? 'dropdown-active' : 'dropdown'} 
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      >
      <div className='menu-container'>
        <img src={userActive.avatar} alt={userActive.name}/>
        <strong>Minha Conta</strong>
      </div>
      <div className='dropdown-content'>
        <span className='menu-item'>Logado como <strong style={{color: '#6C63FF'}}>{userActive.name}</strong></span>
        <hr/>
        <span className='menu-item' onClick={openProfile}>Perfil</span>
        <span className='menu-item' onClick={logOut}>Sair</span>
      </div>
    </div>
  )
}