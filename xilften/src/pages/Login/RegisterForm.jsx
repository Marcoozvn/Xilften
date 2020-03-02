import React from 'react';
import { changeName, changeEmail, changeUsername, changePassword, changeConfirmPassword, setError } from '../../store/actions/formActions';
import { register } from '../../store/actions/userActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './Form.css';

const RegisterForm = ({ name, email, username, password, confirmPassword, error, changeName, changeEmail, changeUsername, changePassword, changeConfirmPassword, setError, register }) => {

  async function handleSignIn(e) {
    e.preventDefault()

    if (!name || !username || !email || !password || !confirmPassword) setError("Preencha todos os dados para se cadastrar")

    else if ( password !== confirmPassword ) setError("A senha e a confirmação de senha são diferentes")
    
    else {
      register({ name, username, email, password });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSignIn}>
        { error && <p>{error}</p>}
        <input 
          id="name"
          type="text"
          placeholder="Qual o seu nome?"
          onChange={e => changeName(e.target.value)} 
          />

        <input 
          id="email"
          type="email"
          placeholder="E-mail"
          onChange={e => changeEmail(e.target.value)} 
          />

        <input 
          id="username"
          type="text"
          placeholder="Insira um username"
          onChange={e => changeUsername(e.target.value)} 
          />

        <input 
          id="password"
          type="password"
          placeholder="Senha"
          onChange={e => changePassword(e.target.value)} 
          />

        <input 
          id="password_confirmation"
          type="password"
          placeholder="Confirme sua senha"
          onChange={e => changeConfirmPassword(e.target.value)} 
          />

        <button className="btn" type="submit">Cadastrar</button>
      </form>
    </div>
  )
}

const mapStateToProps = state => (
  {
    name: state.form.name,
    email: state.form.email,
    username: state.form.username,
    password: state.form.password,
    confirmPassword: state.form.confirmPassword,
    error: state.form.error
  }
)

const mapDispatchToProps = dispatch => 
 bindActionCreators({changeName, changeEmail, changeUsername, changePassword, changeConfirmPassword, setError, register}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);