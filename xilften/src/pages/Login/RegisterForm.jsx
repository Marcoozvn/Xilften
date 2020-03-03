import React from 'react';
import { changeName, changeEmail, changeUsername, changePassword, changeConfirmPassword, setError } from '../../store/actions/formActions';
import { register } from '../../store/actions/userActions';
import { useSelector, useDispatch } from 'react-redux';

import './Form.css';

export default () => {
  const name = useSelector(state => state.form.name);
  const email = useSelector(state => state.form.email);
  const username = useSelector(state => state.form.username);
  const password = useSelector(state => state.form.password);
  const confirmPassword = useSelector(state => state.form.confirmPassword);
  const error = useSelector(state => state.form.error);
  const dispatch = useDispatch();

  async function handleSignIn(e) {
    e.preventDefault()

    if (!name || !username || !email || !password || !confirmPassword) dispatch(setError("Preencha todos os dados para se cadastrar"));

    else if ( password !== confirmPassword ) dispatch(setError("A senha e a confirmação de senha são diferentes"));
    
    else {
      dispatch(register({ name, username, email, password }));
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
          onChange={e => dispatch(changeName(e.target.value))} 
          />

        <input 
          id="email"
          type="email"
          placeholder="E-mail"
          onChange={e => dispatch(changeEmail(e.target.value))} 
          />

        <input 
          id="username"
          type="text"
          placeholder="Insira um username"
          onChange={e => dispatch(changeUsername(e.target.value))} 
          />

        <input 
          id="password"
          type="password"
          placeholder="Senha"
          onChange={e => dispatch(changePassword(e.target.value))} 
          />

        <input 
          id="password_confirmation"
          type="password"
          placeholder="Confirme sua senha"
          onChange={e => dispatch(changeConfirmPassword(e.target.value))} 
          />

        <button className="btn" type="submit">Cadastrar</button>
      </form>
    </div>
  )
}