import React from 'react';
import logo from '../../assets/movie_logo.svg';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useSelector, useDispatch } from 'react-redux';
import { changeRegisterPage } from '../../store/actions/formActions';

import './Login.css';

export default ({ history }) => {
  const registerPage = useSelector(state => state.form.registerPage);
  const dispatch = useDispatch();

  return (
    <div className='login-container'>
      <img src={logo} alt='Logo' style={{width: 200}}/>
      <div className='login-header'>
        <span style={registerPage ? {'opacity': 0.5} : {}} onClick={() => dispatch(changeRegisterPage(!registerPage))}>Login</span>
        <span style={!registerPage ? {'opacity': 0.5} : {}} onClick={() => dispatch(changeRegisterPage(!registerPage))}>Cadastro</span>
      </div>
      {registerPage ? <RegisterForm /> : <LoginForm history={history}/>}
    </div>
  )
}