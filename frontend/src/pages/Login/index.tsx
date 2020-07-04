import React, { useState } from 'react';
import logo from '../../assets/movie_logo.svg';
import login from '../../assets/login.svg'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import './styles.css';

export default () => {
  const [registerPage, setRegisterPage] = useState(false);

  function changePage() {
    setRegisterPage(!registerPage)
  }

  return (
    <div className="container-default">
      <div className='login-container'>
        {!registerPage && <img src={logo} alt='Logo' style={{width: 200}}/>}
        <div className='login-header'>
          <span style={registerPage ? {'opacity': 0.5} : {}} onClick={() => changePage()}>Login</span>
          <span style={!registerPage ? {'opacity': 0.5} : {}} onClick={() => changePage()}>Cadastro</span>
        </div>
        {registerPage ? <RegisterForm changePage={changePage} /> : <LoginForm />}
      </div>
      <img src={login} alt="Img"/>
    </div>
  )
}