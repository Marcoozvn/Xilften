import React, { useState, FormEvent } from 'react'
import { useAuth } from '../../contexts/auth'

import './styles.css'

export default () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signIn } = useAuth()

  async function handleSignIn(e: FormEvent) {
    e.preventDefault()
    
    if (!username || !password) setError("Preencha e-mail e senha para continuar!")
    
    else {
      try {
        await signIn(username, password)
      } catch (error) {
        setError('Login/senha incorretos.')        
      }
    }
  }

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