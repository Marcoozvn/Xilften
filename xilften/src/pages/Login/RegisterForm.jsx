import React, { useState } from 'react';
import Api from '../../services/Api';

import './Form.css';

export default ({ onSignUp }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSignIn(e) {
    e.preventDefault()

    if (!name || !username || !email || !password || !confirmPassword) setError("Preencha todos os dados para se cadastrar")

    else if ( password !== confirmPassword ) setError("A senha e a confirmação de senha são diferentes")
    
    else {
      try {
        await Api.post("/user", { name, username, email, password });

        onSignUp();
        
      } catch (err) {
        setError("Ocorreu um erro ao registrar sua conta. T.T");
      }
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
          onChange={e => setName(e.target.value)} 
          />

        <input 
          id="email"
          type="email"
          placeholder="E-mail"
          onChange={e => setEmail(e.target.value)} 
          />

        <input 
          id="username"
          type="text"
          placeholder="Insira um username"
          onChange={e => setUsername(e.target.value)} 
          />

        <input 
          id="password"
          type="password"
          placeholder="Senha"
          onChange={e => setPassword(e.target.value)} 
          />

        <input 
          id="password_confirmation"
          type="password"
          placeholder="Confirme sua senha"
          onChange={e => setConfirmPassword(e.target.value)} 
          />

        <button className="btn" type="submit">Cadastrar</button>
      </form>
    </div>
  )
}