import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeUsername, changePassword, setError } from '../../store/actions/formActions';
import { login } from '../../store/actions/userActions';

import './Form.css';

const LoginForm = ({ history, username, password, error, changeUsername, changePassword, setError, login }) => {

  async function handleSignIn(e) {
    e.preventDefault();

    if (!username || !password) setError("Preencha e-mail e senha para continuar!");
    
    else {
      login({username, password}, history);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSignIn}>
        { error && <p>{error}</p>}
        <input 
          id="username"
          type="text"
          placeholder="E-mail"
          onChange={e => changeUsername(e.target.value)} 
          />

        <input 
          id="password"
          type="password"
          placeholder="Senha"
          onChange={e => changePassword(e.target.value)} 
          />

        <button className="btn" type="submit">Login</button>
        <hr />
      </form>
    </div>
  )
}

const mapStateToProps = state => (
  {
    username: state.form.username,
    password: state.form.password,
    error: state.form.error
  }
)

const mapDispatchToProps = dispatch => bindActionCreators({changeUsername, changePassword, setError, login}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

