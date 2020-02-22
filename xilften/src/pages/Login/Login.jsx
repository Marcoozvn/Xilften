import React, { useState } from 'react';
import logo from '../../assets/movie_logo.svg';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { login } from '../../services/Auth'

import './Login.css';

export default ({ history }) => {
  const [registerPage, setRegisterPage] = useState(false);

  function onSignIn(token, name, id, avatar) {
    login(token, name, id, avatar);
    history.push('/app');
  }

  function onSignUp() {
    setRegisterPage(false);
    alert('Registro efetuado');
  }

  return (
    <div className='login-container'>
      <img src={logo} alt='Logo' style={{width: 200}}/>
      <div className='login-header'>
        <span style={registerPage ? {'opacity': 0.5} : {}} onClick={() => setRegisterPage(!registerPage)}>Login</span>
        <span style={!registerPage ? {'opacity': 0.5} : {}} onClick={() => setRegisterPage(!registerPage)}>Cadastro</span>
      </div>
      {registerPage ? <RegisterForm onSignUp={onSignUp}/> : <LoginForm onSignIn={onSignIn}/>}
    </div>
  )

}