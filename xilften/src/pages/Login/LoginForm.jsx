import React, { useState } from 'react';
import Api from '../../services/Api'

import './Form.css';

export default ({ onSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSignIn(e) {
    e.preventDefault();

    if (!username || !password) setError("Preencha e-mail e senha para continuar!");
    
    else {
      try {
        const response = await Api.post("/user/login", { username , password });
        const { token, user: { name, _id, avatar } } = response.data;

        onSignIn(token, name, _id, avatar);
        
      } catch (err) {
        setError("Houve um problema com o login, verifique suas credenciais. T.T");
      }
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
          onChange={e => setUsername(e.target.value)} 
          />

        <input 
          id="password"
          type="password"
          placeholder="Senha"
          onChange={e => setPassword(e.target.value)} 
          />

        <button className="btn" type="submit">Login</button>
        <hr />
      </form>
    </div>
  )
}

