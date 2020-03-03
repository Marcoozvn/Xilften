import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeUsername, changePassword, setError } from '../../store/actions/formActions';
import { login } from '../../store/actions/userActions';

import './Form.css';

export default ({ history }) => {
  const username = useSelector(state => state.form.username);
  const password = useSelector(state => state.form.password);
  const error = useSelector(state => state.form.error);
  const dispatch = useDispatch();

  async function handleSignIn(e) {
    e.preventDefault();

    if (!username || !password) dispatch(setError("Preencha e-mail e senha para continuar!"));
    
    else {
      dispatch(login({username, password}, history));
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
          onChange={e => dispatch(changeUsername(e.target.value))} 
          />

        <input 
          id="password"
          type="password"
          placeholder="Senha"
          onChange={e => dispatch(changePassword(e.target.value))} 
          />

        <button className="btn" type="submit">Login</button>
        <hr />
      </form>
    </div>
  )
}