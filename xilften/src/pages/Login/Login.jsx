import React from 'react';
import logo from '../../assets/movie_logo.svg';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeRegisterPage } from '../../store/actions/formActions';

import './Login.css';

const Login = ({ history, registerPage, changeRegisterPage }) => {

  return (
    <div className='login-container'>
      <img src={logo} alt='Logo' style={{width: 200}}/>
      <div className='login-header'>
        <span style={registerPage ? {'opacity': 0.5} : {}} onClick={() => changeRegisterPage(!registerPage)}>Login</span>
        <span style={!registerPage ? {'opacity': 0.5} : {}} onClick={() => changeRegisterPage(!registerPage)}>Cadastro</span>
      </div>
      {registerPage ? <RegisterForm history={history}/> : <LoginForm history={history}/>}
    </div>
  )
}

const mapStateToProps = state => (
  { registerPage: state.form.registerPage }
)

const mapDispatchToProps = dispatch => bindActionCreators({changeRegisterPage}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login);